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
  writer: string;

  @Prop({ index: true })
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
const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ title: 'text', content: 'text' });
export { PostSchema };
