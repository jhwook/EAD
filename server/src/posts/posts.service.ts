import { Injectable, HttpException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly postsRepository: PostsRepository) {}

  async createPost(req) {
    const { title, content, tag, img } = req.body;
    const { username } = req.user;

    const post = await this.postsRepository.create({
      writer: username,
      title,
      content,
      tag,
      img,
    });

    return post;
  }

  async updatePost(req, param) {
    const { postId } = param;
    await this.postsRepository.findPostByIdAndUpdate(postId, req.body);
    const updatedPost = await this.postsRepository.findPostById(postId);
    return updatedPost;
  }

  async deletePost(param) {
    const { postId } = param;
    const isExistPost = await this.postsRepository.findPostById(postId);
    if (isExistPost) {
      await this.postsRepository.findPostByIdAndDelete(postId);
    } else {
      throw new HttpException('존재하지 않는 포스트입니다', 400);
    }
  }
}
