import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post as PostModel, PostSchema } from 'src/posts/posts.schema';
import { Comment, CommentSchema } from 'src/posts/comments.schema';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AwsService } from '../aws.service';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PostModel.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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
  providers: [UsersService, AwsService],
  exports: [UsersService],
})
export class UsersModule {}
