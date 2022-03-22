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
  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(@Req() req) {
    return this.postsService.createPost(req);
  }

  // 포스트 하나 가져오기
  @Get('/:postId')
  async getOnePost(@Param('postId') id: string) {
    return this.postsService.getOnePost(id);
  }

  // 포스트에 적힌 댓글 전부 가져오기
  @Get()
  async getAllComments() {
    return this.postsService.getAllComments();
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

  // 포스트 이미지 업로드
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('posts')))
  @UseGuards(JwtAuthGuard)
  @Post('/upload-post/:postId')
  uploadPostImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() param,
    @Req() req,
  ) {
    console.log(files);
    // return { image: `http://localhost:4000/media/users/${files[0].filename}` };
    return this.postsService.uploadPostImg(req, param, files);
  }

  // 댓글 이미지 업로드
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('comments')))
  @UseGuards(JwtAuthGuard)
  @Post('/upload-comment/:commentId')
  uploadCommentImage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param() param,
    @Req() req,
  ) {
    console.log(files);
    // return { image: `http://localhost:4000/media/users/${files[0].filename}` };
    return this.postsService.uploadCommentImg(req, param, files);
  }
}
