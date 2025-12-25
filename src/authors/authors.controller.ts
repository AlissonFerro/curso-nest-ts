import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Post(':id')
  reactive(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId) {
    return this.authorsService.reactive(id);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId) {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId) {
    return this.authorsService.remove(id);
  }
}
