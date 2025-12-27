import { Controller, Post, Body, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto){
    return this.usersService.login(loginDto);
  }
  
  @Post('refresh_token')
  refreshToken(@Headers('refresh-token') refreshToken: string){
    return this.usersService.refreshToken(refreshToken);
  }

  @Post('change_password')
  changePassword(@Headers('token') token: string, @Body() changePasswordDTO: ChangePasswordDTO){
    return this.usersService.changePassword(changePasswordDTO, token);
  }
}
