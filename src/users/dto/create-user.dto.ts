import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @MinLength(60)
  passwordHash!: string;
}
