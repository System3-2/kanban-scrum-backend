import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {

  createComment() {
    return 'comment created';
  }

  updateComment() {
    return 'comment updated';
  }

  deleteComment() {
    return 'comment deleted';
  }
}
