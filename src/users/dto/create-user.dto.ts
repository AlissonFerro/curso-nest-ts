import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
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
    @MinLength(6, { message: 'A senha deve conter mais que 6 caracteres' })
    password: string
}