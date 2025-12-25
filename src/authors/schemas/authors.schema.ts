import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsBoolean, IsString } from "class-validator";
import { Document, HydratedDocument } from "mongoose";

export type AuthorDocument = HydratedDocument<Author>;

@Schema({ collection: 'authors' })
export class Author extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    birthday: string;

    @IsString()
    bio: string

    @Prop({ 
        type: Boolean,
        required: true, 
        default: false 
    })
    @IsBoolean()
    isDeleted: boolean
}

export const AuthorSchema = SchemaFactory.createForClass(Author)