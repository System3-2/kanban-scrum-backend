import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createProject(@Body() body: CreateProjectDto, @Request() req) {
    return this.projectService.createProject(body, req);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:projectId')
  getProjectWithUsersAndIssues(@Param('projectId') projectId: number) {
    console.log('controller', { projectId });
    return this.projectService.getProjectWithUsersAndIssues(projectId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch('/:projectId')
  updateProject(
    @Param('projectId') projectId: number,
    @Body() body: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(projectId, body);
  }

  @HttpCode(HttpStatus.CREATED)
  @Get('/:projectId/:userId')
  addUsertoProject(@Param('projectId') projectId: number, @Request() req) {
    return this.projectService.addUserToProject(projectId, req.user.user.id);
  }
}
