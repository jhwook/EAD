import { Injectable, HttpException } from '@nestjs/common';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly postsRepository: PostsRepository) {}

  // 포스트 작성
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

  // 포스트 수정
  async updatePost(req, param) {
    const { postId } = param;
    await this.postsRepository.findPostByIdAndUpdate(postId, req.body);
    const updatedPost = await this.postsRepository.findPostById(postId);
    return updatedPost;
  }

  // 포스트 삭제
  async deletePost(param) {
    const { postId } = param;
    const isExistPost = await this.postsRepository.findPostById(postId);
    if (isExistPost) {
      await this.postsRepository.findPostByIdAndDelete(postId);
    } else {
      throw new HttpException('존재하지 않는 포스트입니다', 400);
    }
  }

  // 검색
  async searchPost(body) {
    const { keyword } = body;
    // eslint-disable-next-line no-return-await
    return await this.postsRepository.searchPostInDB(keyword);
  }

  // 검색 (태그)
  async searchPostByTag(body) {
    const { tag } = body;
    // eslint-disable-next-line no-return-await
    return await this.postsRepository.searchPostByTag(tag);
  }

  // 댓글 작성
  async createComment(req, param) {
    const { content } = req.body;
    const { username } = req.user;
    const { postId } = param;
    const post = await this.postsRepository.addComment(
      content,
      postId,
      username,
    );
    return post;
  }

  // 댓글 수정
  async modifyComment(body, param) {
    const { comment } = body;
    const { postId } = param;
    const post = await this.postsRepository.editComment(comment, postId);
  }
}
