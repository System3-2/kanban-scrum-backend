import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { ProjectCategory } from '@prisma/client';
export class CreateProjectDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsString()
  description: string;

  @IsEnum(ProjectCategory)
  category: ProjectCategory;
}

export class UpdateProjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ProjectCategory)
  category?: ProjectCategory;
}
