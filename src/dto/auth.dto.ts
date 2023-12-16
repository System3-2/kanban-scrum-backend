import { IsString, IsEmail, IsOptional} from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}