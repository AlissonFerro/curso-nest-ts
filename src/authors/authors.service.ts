import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from './schemas/authors.schema';
import { HydratedDocument, Model, Types } from 'mongoose';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) { }

  create(createAuthorDto: CreateAuthorDto) {
    const createAuthor = new this.authorModel(createAuthorDto);
    return createAuthor.save()
  }

  async findAll(): Promise<Author[]> {
    const authors = await this.authorModel.find({}, { isDeleted: false });
    if (!authors.length)
      throw new NotFoundException('Nenhum autor encontrado');

    return authors;
  }

  async findOne(id: Types.ObjectId): Promise<HydratedDocument<Author>> {
    const author = await this.authorModel.findById(id, {}, { isDeleted: false })

    if (!author) throw new NotFoundException('Nenhum autor encontrado');

    return author
  }

  async update(id: Types.ObjectId, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);

    author.set(updateAuthorDto);

    return await author.save();
  }

  async remove(id: Types.ObjectId) : Promise<null>  {
    const author = await this.findOne(id);
    author.isDeleted = true;
    await author.save();
    return null; 
  }

  async reactive(id: Types.ObjectId) : Promise<Author> {
    const author = await this.findOne(id);
    author.isDeleted = false;
    return await author.save();
  }
}
