import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CommentDto } from 'src/dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(private db: DatabaseService) {}

  async createComment(body: CommentDto) {
    const issueId = Number(body.issueId);
    try {
      const comment = await this.db.comment.create({
        data: {
          body: body.body,
          issueId: issueId,
        },
        select: {
          id: true,
          body: true,
        },
      });

      return { comment, message: 'Comment created successfully' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  updateComment() {
    return 'comment updated';
  }

  deleteComment() {
    return 'comment deleted';
  }
}
