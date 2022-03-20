import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PostsRepository } from './posts.repository';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSchema, Post } from './posts.schema';
import { CommentSchema, Comment } from './comments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema },
    ]),
    AuthModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
  exports: [PostsService, PostsRepository],
})
export class PostsModule {}
