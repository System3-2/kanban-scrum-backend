import { Controller, Get, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getCurrentUser(@Request() req): any {
    return this.userService.getCurrentUser(req.user);
  }
}
