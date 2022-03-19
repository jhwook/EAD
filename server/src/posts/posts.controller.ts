import {
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
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

  // eslint-disable-next-line class-methods-use-this
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  createPost(@Req() req) {
    return this.postsService.createPost(req);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:postId')
  updatePost(@Req() req, @Param() param) {
    return this.postsService.updatePost(req, param);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:postId')
  deletePost(@Param() param) {
    return this.postsService.deletePost(param);
  }
}
