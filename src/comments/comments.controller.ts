import {
  Controller,
  Delete,
  Patch,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto, CommentUpdateDto } from 'src/dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  createComment(@Body() body: CommentDto) {
    return this.commentsService.createComment(body);
  }

  @Patch('/:commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateComment(@Param('commentId') commentId: number, @Body() body: CommentUpdateDto) {
    return this.commentsService.updateComment(commentId, body);
  }

  @Delete('/:commentId')
  @HttpCode(HttpStatus.OK)
  deleteComment(@Param('commentId') commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }
}
