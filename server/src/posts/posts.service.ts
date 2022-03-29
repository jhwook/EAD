import { Injectable, HttpException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  // 포스트 하나만 가져오기
  async getOnePost(id) {
    const post = this.postsRepository.getOnePost(id);
    return post;
  }

  // async getAllComments() {}

  // 포스트 작성
  async createPost(req) {
    const { title, content, tags, bounty } = req.body;
    // const { id } = req.user;
    // console.log(req.user);
    // console.log(id);
    const post = await this.postsRepository.create({
      // eslint-disable-next-line no-underscore-dangle
      writer: req.user._id,
      title,
      content,
      tags,
      bounty,
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

  // 포스트 이미지 저장
  async uploadPostImg(req, param, files: Express.Multer.File[]) {
    const { user } = req;
    const { postId } = param;
    const post = await this.postsRepository.findPostById(postId);

    if (user.username === post.writer) {
      const fileName = `posts/${files[0].filename}`;
      const newPost = await this.postsRepository.findPostAndUpdateImg(
        postId,
        fileName,
      );

      return newPost;
    }
    throw new HttpException('작성자가 일치하지 않습니다.', 401);
  }

  // 검색
  async searchPost(keyword) {
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

    const validatedWriter = await this.usersRepository.findUserByUsername(
      username,
    );

    const validatedPost = await this.postsRepository.findPostById(postId);

    const post = await this.postsRepository.addComment(
      content,
      // eslint-disable-next-line no-underscore-dangle
      validatedPost._id,
      // eslint-disable-next-line no-underscore-dangle
      validatedWriter._id,
    );
    return post;
  }

  // 댓글 수정
  async modifyComment(req, param) {
    const { content } = req.body;
    const { commentId } = param;
    const newComment = await this.postsRepository.editComment(
      content,
      commentId,
    );
    return newComment;
    // throw new HttpException('수정 완료!!!!!', 200);
  }

  // 댓글 삭제
  async deleteComment(param) {
    const { commentId } = param;
    const updatedPost = await this.postsRepository.deleteComment(commentId);
    return updatedPost;
    // throw new HttpException('삭제 완료.....', 200);
  }

  // 댓글에 이미지 저장
  async uploadCommentImg(req, param, files: Express.Multer.File[]) {
    const { user } = req;
    const { commentId } = param;
    const comment = await this.postsRepository.findCommentById(commentId);
    if (user.username === comment.writer) {
      const fileName = `comments/${files[0].filename}`;
      const newComment = await this.postsRepository.findCommentAndUpdateImg(
        commentId,
        fileName,
      );
      return newComment;
    }
    throw new HttpException('작성자가 일치하지 않습니다.', 401);
  }

  // 포스트 제목만 주기
  async getPostTitle() {
    const postTitles = await this.postsRepository.getTitle();
    return postTitles;
  }
}
