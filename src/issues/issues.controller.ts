import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { IssuesService } from './issues.service';

@Controller('issues')
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  @Get()
  getProjectIssues() {
    return this.issuesService.getProjectIssues();
  }

  @Get('/:issueId')
  getIssueWithUsersAndComments() {
    return this.issuesService.getIssueWithUsersAndComments();
  }

  @Post('/create')
  createIssues() {
    return this.issuesService.createIssues();
  }

  @Patch('/:issueId')
  updateIssue() {
    return this.issuesService.updateIssue();
  }

  @Delete('/:issueId')
  deleteIssue() {
    return this.issuesService.deleteIssue();
  }
}
