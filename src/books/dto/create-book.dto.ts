import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateBookDto {
    @IsString()
    @MinLength(3, { message: 'O título deve conter mais que 3 ou igual a caracteres' })
    title: string

    @IsArray()
    @IsMongoId({ each: true }) // Valida cada ID dentro do array
    authors: string[];

    @IsOptional()
    @IsString()
    isbn?: string
}
