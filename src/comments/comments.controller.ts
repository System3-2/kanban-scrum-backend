import { Controller, Delete, Patch, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from 'src/dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/create')
  createComment(@Body() body: CommentDto) {
    return this.commentsService.createComment(body);
  }

  @Patch('/:commentId')
  updateComment() {
    return this.commentsService.updateComment();
  }

  @Delete('/:commentId')
  deleteComment() {
    return this.commentsService.deleteComment();
  }
}
