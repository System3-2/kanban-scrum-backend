import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CommentDto {
  @IsString()
  body: string;

  @IsNumber()
  issueId: number;
}

export class CommentUpdateDto {
  @IsString()
  body: string;
}