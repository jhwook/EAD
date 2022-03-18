import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.schema';

@Injectable()
export class PostsRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async create(post) {
    return await this.postModel.create(post);
  }

  async findPostById(id) {
    return await this.postModel.findById(id);
  }

  async findPostByIdAndUpdate(id, body) {
    const { title, content, img } = body;
    const updatedPost = await this.postModel.findByIdAndUpdate(id, {
      title,
      content,
      img,
    });
    console.log(updatedPost);
    return updatedPost;
  }
}
