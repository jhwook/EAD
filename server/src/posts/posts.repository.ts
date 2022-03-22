import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post } from './posts.schema';
import { Comment, CommentSchema } from './comments.schema';

@Injectable()
export class PostsRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  // 포스트 하나만 가져오기
  async getOnePost(id) {
    const post = await this.postModel.findById(id).populate('comments');
    return post;
  }

  // 포스트 생성
  async create(post) {
    // eslint-disable-next-line no-return-await
    return await this.postModel.create(post);
  }

  // 포스트 id로 찾기
  async findPostById(id) {
    // eslint-disable-next-line no-return-await
    const post = await this.postModel.findById(id);
    return post;
  }

  // 포스트 id로 찾고 포스트 수정
  async findPostByIdAndUpdate(id, body) {
    const { title, content, img } = body;
    const updatedPost = await this.postModel.findByIdAndUpdate(id, {
      title,
      content,
      img,
    });
    return updatedPost;
  }

  // 포스트 id로 찾고 포스트 삭제
  async findPostByIdAndDelete(id) {
    const deletePost = this.postModel.findByIdAndDelete(id);
    return deletePost;
  }

  // 키워드로 포스트 찾기
  async searchPostInDB(keyword) {
    let postArray = [];
    postArray = await this.postModel
      .find({ $text: { $search: keyword } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } });
    return postArray;
  }

  // 태그로 포스트 찾기
  async searchPostByTag(tag) {
    let postArray = [];
    postArray = await this.postModel.find({ tag: { $all: tag } });
    return postArray;
  }

  // 댓글 작성
  async addComment(content, postId, id) {
    // await this.postModel.findByIdAndUpdate(postId, {
    //   $push: { comment: { $each: [newComment], $position: 0 } },
    // });
    const newComment = await this.commentModel.create({
      post_id: postId,
      writer: id,
      content,
    });
    await this.postModel.findByIdAndUpdate(postId, {
      $push: { comment: { $each: [newComment.id], $position: 0 } },
    });
    const newPost = await this.postModel.findById(postId);
    return newPost;
  }

  // 댓글 수정
  async editComment(content, commentId) {
    // await this.commentModel.findByIdAndUpdate(commentId, {
    //   content: newComment,
    // });
    // const modifiedComment = await this.commentModel.findById(commentId);

    // // await this.postModel.findByIdAndUpdate(modifiedComment.post_id, {
    // //   comment: { $set: { id: commentId }, content: newComment },
    // // });
    // interface ExampleObject {
    //   [key: string]: any;
    // }
    // const post = await this.postModel.findById(modifiedComment.post_id);

    // const newCommentArr = post.comment.map((comment: ExampleObject) => {
    //   // eslint-disable-next-line no-underscore-dangle
    //   if (String(comment._id) === commentId) {
    //     // eslint-disable-next-line no-param-reassign
    //     comment.content = modifiedComment.content;
    //   }
    //   return comment;
    // });

    // await this.postModel.findByIdAndUpdate(modifiedComment.post_id, {
    //   comment: newCommentArr,
    // });
    await this.commentModel.findByIdAndUpdate(commentId, {
      content,
    });
    const newComment = await this.commentModel.findById(commentId);
    return newComment;
  }

  // 댓글 삭제
  async deleteComment(commentId) {
    // const comment = await this.commentModel.findById(commentId);

    // const post = await this.postModel.findById(comment.post_id);

    // interface ExampleObject {
    //   [key: string]: any;
    // }
    // const newCommentArr = post.comment.filter((comment: ExampleObject) => {
    //   // eslint-disable-next-line no-underscore-dangle
    //   return String(comment._id) !== commentId;
    // });

    // await this.postModel.findByIdAndUpdate(comment.post_id, {
    //   comment: newCommentArr,
    // });

    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new HttpException('존재하지 않는 댓글입니다.', 400);
    }
    const post = await this.postModel.findById(comment.post_id);
    await this.commentModel.findByIdAndDelete(commentId);
    await this.postModel.findByIdAndUpdate(post.id, {
      $pull: { comment: commentId },
    });
    const updatedPost = await this.postModel.findById(post.id);
    return updatedPost;
  }

  // 댓글 찾기
  async findCommentById(commentId) {
    const comment = await this.commentModel.findById(commentId);
    return comment;
  }

  // 전체 포스트 제목만 가져오기
  async getTitle() {
    const titleArr = await this.postModel.find();
    return titleArr.map((post) => {
      return post.title;
    });
  }

  // 포스트 이미지 업로드
  async findPostAndUpdateImg(id: string, fileName: string) {
    const post = await this.postModel.findById(id);
    post.imgUrl = `http://localhost:4000/media/${fileName}`;
    const newPost = await post.save();
    console.log(newPost);
    return newPost;
  }

  // 댓글 이미지 업로드
  async findCommentAndUpdateImg(id: string, fileName: string) {
    const comment = await this.commentModel.findById(id);
    comment.imgUrl = `http://localhost:4000/media/${fileName}`;
    const newComment = await comment.save();
    console.log(newComment);
    return newComment;
  }
}
