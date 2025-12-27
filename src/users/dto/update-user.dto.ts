import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "O nome deve conter 3 ou mais caracteres" })
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "O sobrenome deve conter 3 ou mais caracteres" })
    lastname: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsOptional()
    avatarUrl: string

    @IsString()
    password: string

    @IsNumber({ maxDecimalPlaces: 0 })
    tokenVersion: number

    @IsDate()
    deletedAt: Date
}
