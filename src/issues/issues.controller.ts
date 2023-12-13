import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Request,
  Query,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssueDto, IssueQueryDto, IssueUpdateDto } from 'src/dto/issues.dto';

@Controller('issues')
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  @Get()
  getProjectIssues(@Request() req, @Query() query: IssueQueryDto) {
    return this.issuesService.getProjectIssue(req.user, query)
    
  }

  @Get('/:issueId')
  getIssueWithUsersAndComments(@Param('issueId') issueId: number) {
    return this.issuesService.getIssueWithUsersAndComments(issueId);
  }

  @Post('/create')
  createIssues(@Body() body: IssueDto) {
    return this.issuesService.createIssues(body);
  }

  @Patch('/:issueId')
  updateIssue(@Body() body: IssueUpdateDto, @Param('issueId') issueId: number) {
    return this.issuesService.updateIssue(body, issueId);
  }

  @Delete('/:issueId')
  deleteIssue(@Param('issueId') issueId: number) {
    return this.issuesService.deleteIssue(issueId);
  }
}
