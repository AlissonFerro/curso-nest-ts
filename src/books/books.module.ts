import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Author, AuthorSchema } from 'src/authors/schemas/authors.schema';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [
    AuthorsModule,
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema},
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService],
})

export class BooksModule {}
