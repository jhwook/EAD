import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MulterModule } from '@nestjs/platform-express';
import { Post, PostSchema } from 'src/posts/posts.schema';
import { Comment, CommentSchema } from 'src/posts/comments.schema';
import { google } from 'googleapis';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// const tokenFunc = async () => {
// const OAuth2Client = new google.auth.OAuth2(
//   process.env.OAUTH_CLIENT_ID,
//   process.env.OAUTH_CLIENT_SECRET,
//   process.env.REDIRECT_URI,
// );
// OAuth2Client.setCredentials({
//   refresh_token: process.env.OAUTH_REFRESH_TOKEN,
// });
// const accessToken = OAuth2Client.getAccessToken().then((data) => data);
// console.log(accessToken);
// return accessToken;
// };
// console.log(tokenFunc());
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
        // requireTLS: true,
        // requireSSL: true,
        // requiresAuthentication: true,
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASS,
          clientId: process.env.OAUTH_CLIENT_ID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          // accessToken: process.env.OAUTH_ACCESS_TOKEN,
        },
      },
    }),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (cfg: ConfigService) => ({
        accountSid: cfg.get('TWILIO_ACCOUNT_SID'),
        authToken: cfg.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => AuthModule),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
