import { IsString } from 'class-validator';

export class CommentsCreateDto {
  @IsString()
  content: string;
}
