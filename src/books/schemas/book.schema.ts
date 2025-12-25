import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Author } from "src/authors/schemas/authors.schema";

export type BookDocument = HydratedDocument<Book>;

@Schema({ collection: 'books' })
export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }] })
    authors: Author[];

    @Prop()
    isbn: string;

    @Prop()
    isDeleted: boolean
}

export const BookSchema = SchemaFactory.createForClass(Book);