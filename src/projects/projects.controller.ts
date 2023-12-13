import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Param,
  Patch,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Post('/create')
  createProject(@Body() body: CreateProjectDto, @Request() req) {
    return this.projectService.createProject(body, req);
  }

  @Get('/:projectId')
  getProjectWithUsersAndIssues(@Param('projectId') projectId: number) {
    console.log('controller', { projectId });
    return this.projectService.getProjectWithUsersAndIssues(projectId);
  }

  @Patch('/:projectId')
  updateProject(
    @Param('projectId') projectId: number,
    @Body() body: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(projectId, body);
  }

  @Get('/:projectId/:userId')
  addUsertoProject(
    @Param('projectId') projectId: number,
    @Param('userId') userId: number,
  ) {
    return this.projectService.addUserToProject(projectId, userId);
  }
}
