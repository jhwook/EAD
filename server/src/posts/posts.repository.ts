import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Post } from './posts.schema';
import { Comment, CommentSchema } from './comments.schema';

@Injectable()
export class PostsRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  // 포스트 id로 찾기
  async findPostById(id) {
    // eslint-disable-next-line no-return-await
    const post = await this.postModel.findById(id);
    return post;
  }

  // 댓글 찾기
  async findCommentById(commentId) {
    const comment = await this.commentModel.findById(commentId);
    return comment;
  }

  // 전체 포스트 제목만 가져오기
  async getTitle() {
    // console.log(';;;;;;;;;');
    const titleArr = await this.postModel.find({});
    // console.log(titleArr);
    return titleArr.map((post) => {
      return { id: post.id, title: post.title, tag: post.tag };
    });
  }

  // // 포스트 이미지 업로드
  // async findPostAndUpdateImg(id: string, fileName: string) {
  //   const post = await this.postModel.findById(id);
  //   post.imgUrl = `http://localhost:4000/media/${fileName}`;
  //   const newPost = await post.save();
  //   console.log(newPost);
  //   return newPost;
  // }

  // // 댓글 이미지 업로드
  // async findCommentAndUpdateImg(id: string, fileName: string) {
  //   const comment = await this.commentModel.findById(id);
  //   comment.imgUrl = `http://localhost:4000/media/${fileName}`;
  //   const newComment = await comment.save();
  //   console.log(newComment);
  //   return newComment;
  // }
}
