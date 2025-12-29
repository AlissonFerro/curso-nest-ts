import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Author, AuthorSchema } from 'src/authors/schemas/authors.schema';
import { AuthorsModule } from 'src/authors/authors.module';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    AuthorsModule,
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema},
    ]),
    BlacklistModule,
    UsersModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
})

export class BooksModule {}
