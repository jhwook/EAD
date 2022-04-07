import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { Post, PostSchema } from 'src/posts/posts.schema';
import { Comment, CommentSchema } from 'src/posts/comments.schema';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AwsService } from '../aws.service';
// import { MulterExtendedModule } from 'nestjs-multer-extended';
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
    // MulterExtendedModule.register({
    //   awsConfig: {
    //     accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
    //     secretAccessKey: 'YOUR_AWS_ACCESS_KEY_ID',
    //     region: 'AWS_REGION_NEAR_TO_YOU',
    //     // ... any options you want to pass to the AWS instance
    //   },
    //   bucket: 'YOUR_S3_BUCKET_NAME',
    //   basePath: 'ROOT_DIR_OF_ASSETS',
    //   fileSize: 1 * 1024 * 1024,
    // }),
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
  providers: [UsersService, UsersRepository, AwsService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
