import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { CLOUDINARY } from 'src/constants/cloudinary';

export const CloudinaryProvider = {
  provide: 'cloudinary',
  useFactory: () => {
    return v2.config({
      api_secret: process.env.CLOUD_API_SECRET,
      api_key: process.env.CLOUD_API_KEY,
      cloud_name: process.env.CLOUD_NAME,
    });
  },
};

