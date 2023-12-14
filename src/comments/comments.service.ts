import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { CommentDto, CommentUpdateDto } from 'src/dto/comment.dto';

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

  async updateComment(commentId: number, body: CommentUpdateDto) {
    console.log({ commentId });
    const id = Number(commentId);
    try {
      const comment = await this.db.comment.update({
        where: { id },
        data: { 
          body: body.body
         },
      });
      console.log({comment})
      return 'Updated comment';
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException('Comment does not exist');
      }
      throw new BadRequestException(error);
    }
  }

  async deleteComment(commentId: number) {
    console.log({ commentId });
    const id = Number(commentId);
    try {
      const issue = await this.db.comment.delete({
        where: { id },
      });
      console.log(issue);
      return 'Comment deleted';
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025')
          throw new NotFoundException('Comment does not exist');
      }
      throw new BadRequestException(error);
    }
  }
}
