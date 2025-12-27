import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class ChangePasswordDTO{
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: "A senha deve conter mais que 6 caracteres" })
    oldPassword: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: "A senha deve conter mais que 6 caracteres" })
    password: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: "A senha deve conter mais que 6 caracteres" })
    confirmPassword: string


}