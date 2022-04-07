import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Post } from 'src/posts/posts.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @Prop({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
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

  @Prop()
  refreshToken: string;

  @Prop({ default: 'none' })
  oauthId: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    username: string;
    stacks: object;
    oauth;
    imgUrl: string;
    posts: Post[];
    refreshToken: string;
    oauthId: string;
  };

  readonly posts: Post[];
}

// eslint-disable-next-line no-underscore-dangle
const _UserSchema = SchemaFactory.createForClass(User);
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
