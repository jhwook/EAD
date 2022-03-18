import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Post extends Document {
  @Prop()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Prop([String])
  @IsNotEmpty()
  tag: string[];

  @Prop([String])
  @IsNotEmpty()
  comment: string[];

  @Prop()
  @IsString()
  imgUrl: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
