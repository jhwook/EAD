/* eslint-disable no-underscore-dangle */
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Room extends Document {
  @Prop()
  roomName: string;

  @Prop([String])
  chatting: [];

  @Prop([String])
  users: [];

  @Prop()
  leftUser: string;
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
