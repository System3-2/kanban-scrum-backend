import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto, SignUpDto } from 'src/dto/authDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwt: JwtService,
  ) {}
  //NOTE: salting password
  saltOrRounds = 10;

  async login(body: LoginDto) {
    const user = await this.db.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      console.log('no user found');
      throw new NotFoundException('User does not exist');
    }

    const isMatch = await bcrypt.compare(body.password, user.hash);
    if (!isMatch) throw new ForbiddenException('Invalid credentials');
    return this.signToken(user.id, user.email);
  }

  async signUp(body: SignUpDto) {
    const hash = await bcrypt.hash(body.password, this.saltOrRounds);
    try {
      const user = await this.db.user.create({
        data: {
          email: body.email,
          hash: hash,
          name: body.name,
        },
        select: {
          id: true,
          email: true,
          avatarUrl: true,
          name: true,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      throw new HttpException(
        'Account could not be created',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ token: string; user: object }> {
    const user = await this.db.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        avatarUrl: true,
        name: true,
      },
    });

    const token = this.jwt.sign({ user });
    return {
      token,
      user,
    };
  }
}
