import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Post } from './posts.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Comment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post_id: Post;

  @Prop()
  @IsString()
  writer: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Prop({ default: 0 })
  @IsNumber()
  up: number;

  @Prop()
  @IsString()
  imgUrl: string;
}
const CommentSchema = SchemaFactory.createForClass(Comment);
// CommentSchema.index({ title: 'text', content: 'text' });
export { CommentSchema };
