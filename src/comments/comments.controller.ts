import { Controller, Delete, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/create')
  createComment() {
    return this.commentsService.createComment();
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
