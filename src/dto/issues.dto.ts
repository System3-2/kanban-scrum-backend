import { IssuePriority, IssueStatus, IssueType } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class IssueDto {
  @IsString()
  title: string;

  @IsEnum(IssueType)
  type: IssueType;

  @IsEnum(IssueStatus)
  status: IssueStatus;

  @IsEnum(IssuePriority)
  priority: IssuePriority;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  descriptionText: string;

  @IsNumber()
  @IsOptional()
  timeSpent: number;

  @IsNumber()
  @IsOptional()
  timeRemaining: number;
}

export class IssueUpdateDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsEnum(IssueType)
  @IsOptional()
  type: IssueType;

  @IsEnum(IssueStatus)
  @IsOptional()
  status: IssueStatus;

  @IsEnum(IssuePriority)
  @IsOptional()
  priority: IssuePriority;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  descriptionText: string;

  @IsNumber()
  @IsOptional()
  timeSpent: number;

  @IsNumber()
  @IsOptional()
  timeRemaining: number;
}
export class IssueId {
  @IsInt()
  id: number;
}

export class IssueQueryDto {
  @IsString()
  description: string;
}
