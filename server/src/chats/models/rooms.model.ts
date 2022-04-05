/* eslint-disable no-underscore-dangle */
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { Types, Document } from 'mongoose';
import { Chatting } from './chattings.model';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Room extends Document {
  @Prop()
  roomName: string;

  // @Prop({
  //   type: {
  //     _id: { type: Types.ObjectId, required: true, ref: 'Chatting' },
  //     user: { type: String, required: true },
  //     content: { type: String },
  //   },
  // })
  // @IsNotEmpty()
  // chat: Chatting;

  @Prop([String])
  chatting: [];

  @Prop([String])
  users: [];
}

const _RoomSchema = SchemaFactory.createForClass(Room);

_RoomSchema.virtual('chattings', {
  ref: 'Chatting',
  localField: 'chatting',
  foreignField: '_id',
});
_RoomSchema.set('toObject', { virtuals: true });
_RoomSchema.set('toJSON', { virtuals: true });

export const RoomSchema = _RoomSchema;
