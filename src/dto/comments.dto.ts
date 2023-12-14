import { IsNumber, IsString } from "class-validator";

export class CommentsDto {
  
  @IsString()
  body: string;

  @IsNumber()
  issueId: number;
}
