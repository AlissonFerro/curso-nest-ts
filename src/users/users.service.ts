import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Connection, Model, Types } from 'mongoose';
import { User } from './schemas/users.schema';
import { HashService } from './auth/hash.service';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/login-user.dto';
import { JWTService } from './auth/jwt.service';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { BlacklistService } from 'src/blacklist/blacklist.service';
import { AuditLogsService } from 'src/audit-logs/audit-logs.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectConnection() private readonly connection: Connection,
    private blacklistService: BlacklistService,
    private hashService: HashService,
    private jwtService: JWTService,
    private auditLogService: AuditLogsService,
  ) { }
  // TODO: Ao criar um user, gerar o token
  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { password, ...userData } = createUserDto;

    const hashedPassword = await this.hashService.hashPassword(password);
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    return userWithoutPassword
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).select(['password', 'tokenVersion']).exec();
    if (!user)
      throw new NotFoundException('Email e/ou senha invalidas')

    const { password: pass } = user;


    const isMatchPass = await this.hashService.comparePassword(password, pass);

    if (!isMatchPass)
      throw new NotFoundException('Email e/ou senha invalidas');

    const res = this.jwtService.generateJWT({ _id: user._id, tokenVersion: user.tokenVersion });
    return { token: res }
  }

  async findById(id: Types.ObjectId | undefined): Promise<User> {
    if (!id)
      throw new BadRequestException('Nenhum id fornecido');

    const user = await this.userModel.findById(id);

    if (!user)
      throw new NotFoundException('Nenhum usuário encontrado');

    return user;
  }

  async findByIdWithPassword(id: Types.ObjectId | undefined): Promise<User> {
    if (!id)
      throw new BadRequestException('Nenhum id fornecido');

    const user = await this.userModel.findById(id).select('password').select('tokenVersion').exec();

    if (!user)
      throw new NotFoundException('Nenhum usuário encontrado');

    return user;
  }

  async refreshToken(refreshToken: string) {
    const { token: newToken, id } = this.jwtService.refreshTokenAndReturnTokenAndUser(refreshToken)
    const user = await this.findById(id);

    if (typeof user.tokenVersion === 'undefined' || user.tokenVersion === null)
      throw new UnauthorizedException("Nenhum token encontrado");

    user.tokenVersion += 1;

    await user.save();

    return { token: newToken }
  }

  async changePassword(changePasswordDTO: ChangePasswordDTO, token: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    if(changePasswordDTO.oldPassword === changePasswordDTO.password)
      throw new BadRequestException('Senha inválida')
    try {
      const payload = await this.jwtService.verifyTokenAndReturnDecode(token);
      const user = await this.findByIdWithPassword(payload.user._id);
      const isMatched = await this.hashService.comparePassword(changePasswordDTO.oldPassword, user.password);
      if (!isMatched)
        throw new BadRequestException('Senha inválida');

      if (changePasswordDTO.confirmPassword !== changePasswordDTO.password)
        throw new BadRequestException('As senhas não conferem')

      const newPassword = changePasswordDTO.password;

      const newPassHashed = await this.hashService.hashPassword(newPassword);
      user.tokenVersion += 1;
      user.password = newPassHashed;

      await user.save({ session });

      await this.blacklistService.add(
        token,
        String(user._id),
        new Date(payload.exp * 1000),
        "PASSWORD_CHANGE",
        session
      )
      await session.commitTransaction();

      const newToken = this.jwtService.generateJWT({ _id: user._id, tokenVersion: user.tokenVersion })

      this.auditLogService.add(
        payload.user._id,
        'PASSWORD_CHANGE',
        'SUCCESS',
        'User',
        user._id
      ).catch(err => console.error('Erro ao gravar log de sucesso:', err));

      return { token: newToken };
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      session.endSession();
      throw error;
    } finally {
      session.endSession()
    }
  }

  // TODO: Troca de Senha: changePassword (exige a senha atual + a nova).
  // TODO: Logout em todos os dispositivos: Um método que reseta o tokenVersion, deslogando o usuário de todos os lugares de uma vez.
  // TODO: Sanitização de DTOs: No seu main.ts, garanta que o ValidationPipe tenha whitelist: true e forbidNonWhitelisted: true para evitar Mass Assignment Attacks.


}
