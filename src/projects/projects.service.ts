import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProjectDto, UpdateProjectDto } from 'src/dto/projectDto';

@Injectable()
export class ProjectsService {
  constructor(private db: DatabaseService) {}
  async createProject(body: CreateProjectDto, req: any) {
    try {
      const project = await this.db.project.create({
        data: {
          name: body.name,
          url: body.url,
          description: body.description,
          category: body.category,
        },
        select: {
          id: true,
          name: true,
          url: true,
          description: true,
        },
      });
      return project;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProjectWithUsersAndIssues(projectId: number) {
    // console.log('service', { projectId });
    console.log(Number(projectId));
    const id = Number(projectId);
    try {
      const project = await this.db.project.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          url: true,
          description: true,
          // Include is at the same level as select, not nested inside it
          users: {
            select: {
              name: true,
              email: true,
              comments: true,
              avatarUrl: true,
              issues: true,
            },
          },
          issues: true,
        },
      });

      if (!project) {
        throw new NotFoundException('Project does not exist');
      }

      return { project, message: 'Project with users and issues' };
    } catch (error) {
      console.error(error);
      throw new NotFoundException(error.message || 'Error fetching project');
    }
  }

  async updateProject(projectId: number, body: UpdateProjectDto) {
    console.log({ projectId, body });
    try {
      const project = await this.db.project.update({
        where: { id: Number(projectId) },
        data: body,
        select: {
          id: true,
          name: true,
          url: true,
          description: true,
        },
      });
      return { project, message: 'Project updated successfully' };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async addUserToProject(projectId: number, userId: number) {
    console.log({ projectId, userId });
    const projId = Number(projectId);
    const uId = Number(userId);

    try {
      const project = await this.db.project.update({
        where: { id: projId },
        data: {
          users: {
            connect: {
              id: uId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          url: true,
          description: true,
          // Include is at the same level as select, not nested inside it
          users: {
            select: {
              name: true,
              email: true,
              comments: true,
              avatarUrl: true,
              issues: true,
            },
          },
          issues: true,
        },
      });

      if (!project) throw new NotFoundException('Project does not exist');
      return { project, message: 'User added to project' };
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }
}
