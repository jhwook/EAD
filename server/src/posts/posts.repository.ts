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
    await this.commentModel.create({ writer: username, content, up: 0 });
    // await this.postModel.findByIdAndUpdate(postId, {
    //   $push: { comment: { $each: [newComment], $position: 0 } },
    // });
    // const newPost = await this.postModel.findById(postId);
    // return newPost;
  }

  async editComment(newComment, postId) {
    // await this.postModel.findByIdAndUpdate(postId, {
    // })
  }
}
