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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssueDto, IssueQueryDto, IssueUpdateDto } from 'src/dto/issues.dto';

@Controller('issues')
export class IssuesController {
  constructor(private issuesService: IssuesService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  getAll() {
    return this.issuesService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getProjectIssues(@Request() req, @Query() query: IssueQueryDto) {
    return this.issuesService.getProjectIssue(req.user, query);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:issueId')
  getIssueWithUsersAndComments(@Param('issueId') issueId: number) {
    return this.issuesService.getIssueWithUsersAndComments(issueId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createIssues(@Body() body: IssueDto, @Request() req) {
    // console.log( req.user)
    return this.issuesService.createIssues(body, req.user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/:issueId')
  updateIssue(@Body() body: IssueUpdateDto, @Param('issueId') issueId: number) {
    return this.issuesService.updateIssue(body, issueId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:issueId')
  deleteIssue(@Param('issueId') issueId: number) {
    return this.issuesService.deleteIssue(issueId);
  }
}
