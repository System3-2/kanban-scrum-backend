import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from 'src/dto/auth.dto';
import { SkipAuthorization } from './skip-auth.decorator';

@SkipAuthorization()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  // @Get()
  // @Header('Content-Type', 'application/json')
  // @Header('Content-Disposition', 'attachment; filename="package.json"')
  // streamFile():StreamableFile{
  //   const file = createReadStream(join(process.cwd(), 'package.json'));
  //   return new StreamableFile(file)
  // }
}
