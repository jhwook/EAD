import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MulterModule } from '@nestjs/platform-express';
import { Post, PostSchema } from 'src/posts/posts.schema';
import { Comment, CommentSchema } from 'src/posts/comments.schema';
import { google } from 'googleapis';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const OAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.REDIRECT_URI,
);
OAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });
// const accessToken = OAuth2Client.getAccessToken();
@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          type: 'OAUTH2',
          user: process.env.EMAIL_ID,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          // accessToken,
        },
      },
      // template: {
      //   dir: `${process.cwd()}/template/`,
      //   adapter: new HandlebarsAdapter(), // or new PugAdapter()
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
