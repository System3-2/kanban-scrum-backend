import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { FOLDER } from 'src/constants/cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadProfile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: FOLDER},
        (error, result) => {
          // console.log({error, result})
          if(error) error.message
          resolve(result)
        },
      );
      toStream(file.buffer).pipe(upload)
    });
  }
}
