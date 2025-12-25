import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
    @IsString()
    @MinLength(3, { message: 'O nome deve conter 3 ou mais caracteres' })
    name: string

    @IsString()
    birthday: string;

    @IsString()
    bio: string
}
