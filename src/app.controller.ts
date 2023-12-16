import { Controller, Get } from "@nestjs/common";
import { SkipAuthorization } from "./auth/skip-auth.decorator";


@SkipAuthorization()
@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return 'Hi there!';
  }

}