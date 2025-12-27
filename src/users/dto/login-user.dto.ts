import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'O email deve ser valido' })
    @IsNotEmpty({ message: 'O email é obrigatorio' })
    email: string;
    
    @MinLength(6, { message: 'A senha deve conter 6 ou mais caracteres' })
    @IsNotEmpty({ message: 'A senha é obrigatorio' })
    password: string
}