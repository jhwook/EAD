import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Types, Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Chatting extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  @IsNotEmpty()
  user: Types.ObjectId;

  @Prop()
  content: string;
}

const ChattingSchema = SchemaFactory.createForClass(Chatting);
export { ChattingSchema };
