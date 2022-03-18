import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  createPost(body) {
    const { title, content, tag, img } = body;

    const post = this.postsRepository.create({
      title,
      content,
      tag,
      img,
    });

    return post;
  }
}
