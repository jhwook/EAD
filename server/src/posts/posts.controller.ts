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
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utils/multer.options';
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
  // @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Body() body) {
    return this.postsService.createPost(body);
  }

  // 포스트 제목만
  @Post('/title')
  getPostTitle() {
    return this.postsService.getPostTitle();
  }

  // 검색
  @Post('/search')
  searchPost(@Query('keyword') keyword) {
    console.log(keyword);
    return this.postsService.searchPost(keyword);
  }

  // 검색 (태그)
  @Post('/search/tag')
  searchPostByTag(@Body() body) {
    return this.postsService.searchPostByTag(body);
  }

  // 포스트 하나 가져오기
  @Get('/:postId')
  async getOnePost(@Param('postId') id: string) {
    return this.postsService.getOnePost(id);
  }

  // 포스트 수정
  // @UseGuards(JwtAuthGuard)
  @Patch('/:postId')
  updatePost(@Body() body, @Param() param) {
    return this.postsService.updatePost(body, param);
  }

  // 포스트 삭제
  // @UseGuards(JwtAuthGuard)
  @Post('/:postId')
  deletePost(@Param() param, @Body() body) {
    return this.postsService.deletePost(param, body);
  }

  // 댓글 작성
  // @UseGuards(JwtAuthGuard)
  @Post('/:postId/add/comment')
  createComment(@Body() body, @Param() param) {
    return this.postsService.createComment(body, param);
  }

  // 댓글 수정
  // @UseGuards(JwtAuthGuard)
  @Patch('/:commentId/modify/comment')
  modifyComment(@Body() body, @Param() param) {
    return this.postsService.modifyComment(body, param);
  }

  // 댓글 삭제
  // @UseGuards(JwtAuthGuard)
  @Delete('/:commentId/delete/comment')
  deleteComment(@Param() param) {
    return this.postsService.deleteComment(param);
  }

  @Get('/comments/:commentId')
  getOneComment(@Param() param) {
    return this.postsService.getOneComment(param);
  }

  // 포스트 이미지 업로드
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('posts')))
  // @UseGuards(JwtAuthGuard)
  @Post('/upload-post/:postId')
  uploadPostImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() param,
    @Body() body,
  ) {
    console.log(files);
    // return { image: `http://localhost:4000/media/users/${files[0].filename}` };
    return this.postsService.uploadPostImg(body, param, files);
  }

  // 댓글 이미지 업로드
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('comments')))
  // @UseGuards(JwtAuthGuard)
  @Post('/upload-comment/:commentId')
  uploadCommentImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() param,
    @Body() body,
  ) {
    console.log(files);
    // return { image: `http://localhost:4000/media/users/${files[0].filename}` };
    return this.postsService.uploadCommentImg(body, param, files);
  }
}
