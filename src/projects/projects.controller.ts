import { Controller, Get, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Post('/create')
  createProject() {
    return this.projectService.createProject();
  }

  @Get()
  getProjectWithUsersAndIssues() {
    return this.projectService.getProjectWithUsersAndIssues();
  }

  @Put()
  updateProject() {
    return this.projectService.updateProject();
  }
}
