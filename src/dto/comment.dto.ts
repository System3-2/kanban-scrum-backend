import { IsString, IsNumber } from 'class-validator';

export class CommentDto {
  @IsString()
  body: string;

  @IsNumber()
  issueId: number;
}
