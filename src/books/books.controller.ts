import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from 'src/commom/pipes/parse-object-id.pipe';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/commom/guards/auth.guard';

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId) {
    return this.booksService.findOne(new Types.ObjectId(id));
  }

  @Patch(':id')
  update(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId, @Body() updateBookDto: UpdateBookDto ) {
    return this.booksService.update(id, updateBookDto);
  }
}
