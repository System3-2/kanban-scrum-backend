import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import { DatabaseService } from 'src/database/database.service';
import { IssueDto, IssueQueryDto, IssueUpdateDto } from 'src/dto/issues.dto';

@Injectable()
export class IssuesService {
  constructor(private db: DatabaseService) {}
  getProjectIssues() {
    return 'all issues riding';
  }

  async getIssueWithUsersAndComments(issueId: number) {
    const id = Number(issueId);
    try {
      const issue = await this.db.issue.findUnique({
        where: { id },
        select: {
          title: true,
          type: true,
          status: true,
          priority: true,
          description: true,
          descriptionText: true,
          estimate: true,
          timeRemaining: true,
          timeSpent: true,
          reporterId: true,
          id: true,
          comments: {
            select: {
              id: true,
              body: true,
            },
          },
        },
      });
      if (!issue) {
        throw new NotFoundException('Issue not found');
      }

      return issue;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createIssues(body: IssueDto, user: any) {
    try {
      const issues = await this.db.issue.create({
        data: {
          title: body.title,
          type: body.type,
          status: body.status,
          priority: body.priority,
          projectId: user.projectId,
          description: body.description,
          descriptionText: body.descriptionText,
        },
        select: {
          title: true,
          type: true,
          status: true,
          priority: true,
          description: true,
          descriptionText: true,
          estimate: true,
          timeRemaining: true,
          timeSpent: true,
          reporterId: true,
          id: true,
          comments: {
            select: {
              id: true,
              body: true,
            },
          },
        },
      });
      return issues;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async updateIssue(body: IssueUpdateDto, issueId: number) {
    const id = Number(issueId);
    try {
      const issue = await this.db.issue.update({
        where: { id: id },
        data: body,
        select: {
          title: true,
          type: true,
          status: true,
          priority: true,
          description: true,
          descriptionText: true,
          estimate: true,
          timeRemaining: true,
          timeSpent: true,
          reporterId: true,
          id: true,
          comments: {
            select: {
              id: true,
              body: true,
            },
          },
        },
      });
      return { issue, message: 'Issue updated successfully' };
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Issue does not exist');
        }
      }
      throw new BadRequestException(error);
    }
  }

  async deleteIssue(issueId: number) {
    const id = Number(issueId);
    try {
      const issue = await this.db.issue.delete({
        where: { id },
      });
      return 'Issue deleted';
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Issue does not exist');
        }
      }
      throw new BadRequestException(error);
    }
  }

  async getProjectIssue(body: any, query: IssueQueryDto) {
    console.log({ body });
    try {
      const issue = await this.db.issue.findMany({
        where: {
          projectId: body.projectId,
          OR: [
            { title: { contains: query.description, mode: 'insensitive' } },
            {
              description: { contains: query.description, mode: 'insensitive' },
            },
            // Add other fields you want to search on
          ],
        },
      });
      return issue;
    } catch (error) {
      if(error instanceof PrismaClientValidationError) {
      throw new NotFoundException('User does not belong to the project')
      }
      throw new BadRequestException(error);
    }
  }

  async getAll() {
    try {
      const issues = await this.db.issue.findMany({
        select: {
          title: true,
          type: true,
          status: true,
          priority: true,
          description: true,
          descriptionText: true,
          estimate: true,
          timeRemaining: true,
          timeSpent: true,
          reporterId: true,
          id: true,
          comments: {
            select: {
              id: true,
              body: true,
            },
          },
        },
      });
      return issues;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
