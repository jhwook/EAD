import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Post } from 'src/posts/posts.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({
    required: true,
    // unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop([Boolean])
  stacks: boolean[];

  @Prop()
  oauth: boolean;

  @Prop()
  @IsString()
  imgUrl: string;

  @Prop()
  deposit: number;

  @Prop({ default: 0 })
  money: number;

  readonly readOnlyData: {
    id: string;
    email: string;
    username: string;
    stacks: object;
    oauth;
    imgUrl: string;
    posts: Post[];
  };

  readonly posts: Post[];
}

// eslint-disable-next-line no-underscore-dangle
const _UserSchema = SchemaFactory.createForClass(User);

// eslint-disable-next-line func-names
// _UserSchema.virtual('readOnlyData').get(function (this: User) {
//   return {
//     id: this.id,
//     email: this.email,
//     username: this.username,
//     stacks: this.stacks,
//     oauth: this.oauth,
//     imgUrl: this.imgUrl,
//     posts: this.posts,
//   };
// });

_UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'writer',
});
_UserSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'writer',
});
_UserSchema.set('toObject', { virtuals: true });
_UserSchema.set('toJSON', { virtuals: true });

export const UserSchema = _UserSchema;
