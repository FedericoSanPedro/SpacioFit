import { IsEmail, IsOptional, IsString, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsIn(['ADMIN', 'TRAINER', 'STUDENT'])
  role?: 'ADMIN' | 'TRAINER' | 'STUDENT';
}