import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

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
  writerImg: string;

  @Prop()
  title: string;

  @Prop()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Prop({ default: 0 })
  @IsPositive()
  up: number;

  @Prop({ default: false })
  selection: boolean;
}
const CommentSchema = SchemaFactory.createForClass(Comment);

export { CommentSchema };
