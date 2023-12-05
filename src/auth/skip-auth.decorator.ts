import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'SkipAuth';
export const SkipAuthorization = () => SetMetadata('SkipAuth', true);
