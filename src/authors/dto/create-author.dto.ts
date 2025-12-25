import { IsString, MinLength } from "class-validator";

export class CreateAuthorDto {
    @IsString()
    @MinLength(3, { message: 'O nome deve conter 3 ou mais caracteres' })
    name: string

    @IsString()
    birthday: string;

    @IsString()
    bio: string
}
