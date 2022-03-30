import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Types, Document } from 'mongoose';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { Comment } from './comments.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Post extends Document {
  // 포스트를 작성한 유저
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  @IsNotEmpty()
  writer: Types.ObjectId;

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

  @Prop([Object])
  @IsNotEmpty()
  comment: [];

  @Prop()
  @IsString()
  imgUrl: string;

  @Prop()
  @IsNumber()
  bounty: number;
}
// eslint-disable-next-line no-underscore-dangle
const _PostSchema = SchemaFactory.createForClass(Post);
_PostSchema.index({ title: 'text', content: 'text' });
_PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post_id',
});
_PostSchema.set('toObject', { virtuals: true });
_PostSchema.set('toJSON', { virtuals: true });

export const PostSchema = _PostSchema;
