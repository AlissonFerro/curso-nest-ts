import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose, { HydratedDocument, Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

  async create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    return await createdBook.save();

  }

  async findAll() : Promise<Book[]> {
    const books = await this.bookModel.find().populate('authors').exec();
    if(!books.length) throw new NotFoundException('Nenhum livro encontrado');

    return books;
  }

  async findOne(id: mongoose.Types.ObjectId): Promise<HydratedDocument<Book>> {
    const book = await this.bookModel.findOne(id).populate('authors').exec()
    if(!book) throw new NotFoundException('Nenhum livro encontrado');

    return book;
  }

  async update(id: Types.ObjectId, updateBookDto: UpdateBookDto ): Promise<Book>{
    const book = await this.findOne(id);
    book.set(updateBookDto);
    return await book.save();
  }

  async delete(id: Types.ObjectId): Promise<null>{
    const book = await this.findOne(id);
    book.isDeleted = true;
    await book.save()
    return null
  }
}
