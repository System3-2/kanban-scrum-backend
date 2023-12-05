import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  createProject() {
    return 'project created successfully';
  }

  getProjectWithUsersAndIssues() {
    return 'project with users and issues';
  }

  updateProject() {
    return 'project updated successfully';
  }
}
