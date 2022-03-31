import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Post } from './posts.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Post' })
  @IsNotEmpty()
  post_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  @IsNotEmpty()
  writer: Types.ObjectId;

  @Prop()
  writerName: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Prop({ default: 0 })
  @IsPositive()
  up: number;

  @Prop()
  @IsString()
  imgUrl: string;
}
const CommentSchema = SchemaFactory.createForClass(Comment);
// CommentSchema.index({ title: 'text', content: 'text' });
export { CommentSchema };
