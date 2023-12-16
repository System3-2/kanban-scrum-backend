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

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  createProject(@Body() body: CreateProjectDto ) {
    return this.projectService.createProject(body);
  }

  @Get('/:projectId')
  @HttpCode(HttpStatus.OK)
  getProjectWithUsersAndIssues(@Param('projectId') projectId: number) {
    console.log('controller', { projectId });
    return this.projectService.getProjectWithUsersAndIssues(projectId);
  }

  @Patch('/:projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProject(
    @Param('projectId') projectId: number,
    @Body() body: UpdateProjectDto,
  ) {
    return this.projectService.updateProject(projectId, body);
  }

  @Get('/:projectId/:userId')
  @HttpCode(HttpStatus.CREATED)
  addUsertoProject(@Param('projectId') projectId: number, @Request() req) {
    return this.projectService.addUserToProject(projectId, req.user.id);
  }
}
