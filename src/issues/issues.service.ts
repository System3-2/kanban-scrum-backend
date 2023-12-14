import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

  createIssues(body: IssueDto) {
    try {
      const issues = this.db.issue.create({
        data: {
          title: body.title,
          type: body.type,
          status: body.status,
          priority: body.priority,
          projectId: body.projectId,
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
    console.log({ query });
    const user = await this.db.user.findUnique({
      where: { id: body.user.id },
    });
    console.log({ user });
    const issue = await this.db.issue.findMany({
      where: {
        projectId: user.projectId,
        OR: [
          { title: { contains: query.description, mode: 'insensitive' } },
          { description: { contains: query.description, mode: 'insensitive' } },
          // Add other fields you want to search on
        ],
      },
    });
    return issue;
  }
}
