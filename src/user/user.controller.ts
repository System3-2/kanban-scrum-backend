import {
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getCurrentUser(@Request() req): any {
    return this.userService.getCurrentUser(req.user);
  }

  // Upload profile image
  @HttpCode(HttpStatus.CREATED)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 5000000 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req
  ) {
    const upload = await this.cloudinaryService.uploadProfile(file);
    // console.log({ upload });
    await this.userService.updateUser(upload, req.user)
    return 'file upload successful';
  }
}
