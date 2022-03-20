import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.schema';
import { Comment } from './comments.schema';

@Injectable()
export class PostsRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async create(post) {
    // eslint-disable-next-line no-return-await
    return await this.postModel.create(post);
  }

  async findPostById(id) {
    // eslint-disable-next-line no-return-await
    return await this.postModel.findById(id);
  }

  async findPostByIdAndUpdate(id, body) {
    const { title, content, img } = body;
    const updatedPost = await this.postModel.findByIdAndUpdate(id, {
      title,
      content,
      img,
    });
    return updatedPost;
  }

  async findPostByIdAndDelete(id) {
    const deletePost = this.postModel.findByIdAndDelete(id);
    return deletePost;
  }

  async searchPostInDB(keyword) {
    let postArray = [];
    postArray = await this.postModel
      .find({ $text: { $search: keyword } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } });
    return postArray;
  }

  async searchPostByTag(tag) {
    let postArray = [];
    postArray = await this.postModel.find({ tag: { $all: tag } });
    return postArray;
  }

  async addComment(content, postId, username) {
    // await this.postModel.findByIdAndUpdate(postId, {
    //   $push: { comment: { $each: [newComment], $position: 0 } },
    // });
    const newComment = await this.commentModel.create({
      post_id: postId,
      writer: username,
      content,
    });
    await this.postModel.findByIdAndUpdate(postId, {
      $push: { comment: { $each: [newComment], $position: 0 } },
    });
    const newPost = await this.postModel.findById(postId);
    return newPost;
  }

  async editComment(newComment, commentId) {
    await this.commentModel.findByIdAndUpdate(commentId, {
      content: newComment,
    });
    const modifiedComment = await this.commentModel.findById(commentId);

    // await this.postModel.findByIdAndUpdate(modifiedComment.post_id, {
    //   comment: { $set: { id: commentId }, content: newComment },
    // });
    interface ExampleObject {
      [key: string]: any;
    }
    const post = await this.postModel.findById(modifiedComment.post_id);

    const newCommentArr = post.comment.map((comment: ExampleObject) => {
      if (String(comment._id) === commentId) {
        comment.content = modifiedComment.content;
      }
      return comment;
    });

    await this.postModel.findByIdAndUpdate(modifiedComment.post_id, {
      comment: newCommentArr,
    });
  }

  async deleteComment(commentId) {
    const comment = await this.commentModel.findById(commentId);

    const post = await this.postModel.findById(comment.post_id);

    interface ExampleObject {
      [key: string]: any;
    }
    const newCommentArr = post.comment.filter((comment: ExampleObject) => {
      // eslint-disable-next-line no-underscore-dangle
      return String(comment._id) !== commentId;
    });

    await this.postModel.findByIdAndUpdate(comment.post_id, {
      comment: newCommentArr,
    });
  }
}
