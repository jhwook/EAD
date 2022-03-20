import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  Get,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
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
    private readonly authService: AuthService,
  ) {}

  // 포스트 작성
  // eslint-disable-next-line class-methods-use-this
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  createPost(@Req() req) {
    return this.postsService.createPost(req);
  }

  // 포스트 수정
  @UseGuards(JwtAuthGuard)
  @Patch('/:postId')
  updatePost(@Req() req, @Param() param) {
    return this.postsService.updatePost(req, param);
  }

  // 포스트 삭제
  @UseGuards(JwtAuthGuard)
  @Delete('/:postId')
  deletePost(@Param() param) {
    return this.postsService.deletePost(param);
  }

  // 검색
  @Post('/search')
  searchPost(@Body() body) {
    return this.postsService.searchPost(body);
  }

  // 검색 (태그)
  @Post('/search/tag')
  searchPostByTag(@Body() body) {
    return this.postsService.searchPostByTag(body);
  }

  // 댓글 작성
  @UseGuards(JwtAuthGuard)
  @Post('/:postId/add/comment')
  createComment(@Req() req, @Param() param) {
    return this.postsService.createComment(req, param);
  }

  // 댓글 수정
  @UseGuards(JwtAuthGuard)
  @Patch('/:commentId/modify/comment')
  modifyComment(@Req() req, @Param() param) {
    return this.postsService.modifyComment(req, param);
  }

  // 댓글 삭제
  @UseGuards(JwtAuthGuard)
  @Delete('/:commentId/delete/comment')
  deleteComment(@Param() param) {
    return this.postsService.deleteComment(param);
  }

  // 포스트 제목만
  @Get('/title')
  getPostTitle() {
    return this.postsService.getPostTitle();
  }
}
