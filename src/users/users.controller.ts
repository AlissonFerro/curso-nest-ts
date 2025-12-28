import { Controller, Post, Body, Headers, Ip } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Ip() ip: string) {
    return this.usersService.create(createUserDto, ip);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto, @Ip() ip: string){
    return this.usersService.login(loginDto, ip);
  }
  
  @Post('refresh_token')
  refreshToken(@Headers('refresh-token') refreshToken: string){
    return this.usersService.refreshToken(refreshToken);
  }

  @Post('change_password')
  changePassword(@Headers('token') token: string, @Body() changePasswordDTO: ChangePasswordDTO, @Ip() ip: string){
    return this.usersService.changePassword(changePasswordDTO, token, ip);
  }
}
