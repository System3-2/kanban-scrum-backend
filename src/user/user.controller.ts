import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getCurrentUser(@Request() req): any {
    return this.userService.getCurrentUser(req.user);
  }
}
