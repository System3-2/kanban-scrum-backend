import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

interface User {
  id: number;
  email: string;
  avatarUrl?: string;
  name: string;
}
@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async getCurrentUser(user: any) {
    console.log({ user });
    try {
      const currentUser = await this.db.user.findUnique({
        where: { email: user.user.email },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          issues: true,
          project: {
            select: {
              id: true,
              name: true,
              url: true,
              description: true,
              category: true,
            },
          },
        },
      });

      return currentUser;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
