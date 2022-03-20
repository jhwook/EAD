import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  @IsNotEmpty()
  comment: string[];

  @Prop()
  @IsString()
  imgUrl: string;
}
const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({ title: 'text', content: 'text' });
export { PostSchema };
