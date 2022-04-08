import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
  UseFilters,
  UseInterceptors,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsService } from 'src/aws.service';
import { AuthService } from 'src/auth/auth.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

import { PostsService } from './posts.service';

@Controller('posts')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class PostsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly postsService: PostsService,
    private readonly awsService: AwsService,
  ) {}

  // 포스트 작성
  @Post()
  createPost(@Body() body) {
    return this.postsService.createPost(body);
  }

  // 포스트 제목만
  @Post('/title')
  getPostTitle() {
    return this.postsService.getPostTitle();
  }

  // 검색 (키워드)
  @Post('/search')
  searchPost(@Query('keyword') keyword) {
    return this.postsService.searchPost(keyword);
  }

  // 검색 (태그)
  @Post('/search/tag')
  searchPostByTag(@Body() body) {
    return this.postsService.searchPostByTag(body);
  }

  // 유저의 포스트
  @Post('/mypost')
  getMyPost(@Body() body) {
    return this.postsService.getMyPost(body);
  }

  // 유저의 댓글
  @Post('/mycomment')
  getMyComment(@Body() body) {
    return this.postsService.getMyComment(body);
  }

  // 포스트의 내용만 가져오기
  @Get('/:postId/content')
  async getOnePostContent(@Param('postId') id: string) {
    return this.postsService.getOnePostContent(id);
  }

  // 포스트 하나 가져오기
  @Get('/:postId')
  async getOnePost(@Param('postId') id: string) {
    return this.postsService.getOnePost(id);
  }

  // 포스트 수정
  @Patch('/:postId')
  updatePost(@Body() body, @Param() param) {
    return this.postsService.updatePost(body, param);
  }

  // 포스트 삭제
  @Post('/:postId')
  deletePost(@Param() param, @Body() body) {
    return this.postsService.deletePost(param, body);
  }

  // 댓글 작성
  @Post('/:postId/add/comment')
  createComment(@Body() body, @Param() param) {
    return this.postsService.createComment(body, param);
  }

  // 댓글 수정
  @Patch('/:commentId/modify/comment')
  modifyComment(@Body() body, @Param() param) {
    return this.postsService.modifyComment(body, param);
  }

  // 댓글 삭제
  @Delete('/:commentId/delete/comment')
  deleteComment(@Param() param) {
    return this.postsService.deleteComment(param);
  }

  // 댓글 하나 조회
  @Get('/comments/:commentId')
  getOneComment(@Param() param) {
    return this.postsService.getOneComment(param);
  }

  // 포스트 이미지 업로드
  @UseInterceptors(FileInterceptor('image'))
  @Post('/upload/post')
  async uploadPostImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.awsService.uploadFileToS3('posts', file);
    const imgUrl = await this.awsService.getAwsS3FileUrl(result.key);

    return imgUrl;
  }

  // 댓글 이미지 업로드
  @UseInterceptors(FileInterceptor('image'))
  @Post('/upload/comment')
  async uploadCommentImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.awsService.uploadFileToS3('comments', file);
    const imgUrl = await this.awsService.getAwsS3FileUrl(result.key);

    return imgUrl;
  }

  // 댓글 채택
  @Post('/select/comment')
  selectComment(@Body() body) {
    return this.postsService.selectComment(body);
  }
}
