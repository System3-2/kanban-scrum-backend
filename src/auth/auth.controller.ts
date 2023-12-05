import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from 'src/dto/authDto';
import { SkipAuthorization } from './skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuthorization()
  @Post('/signup')
  signUp(@Body() body: SignUpDto) {
    console.log(body);
    return this.authService.signUp(body);
  }

  @SkipAuthorization()
  @Post('/login')
  login(@Body() body: LoginDto) {
    console.log(body);
    return this.authService.login(body);
  }
}
