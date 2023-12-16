import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private readonly reflector: Reflector,
    private db: DatabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.get<boolean>(
      'SkipAuth',
      context.getClass(),
    );

    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      // console.log({ payload });
      const user = await this.db.user.findUnique({
        where: {
          email: payload.user.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          projectId: true,
        }
      });
      console.log({ user });
      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];
    return bearer === 'Bearer' ? token : undefined;
  }
}
