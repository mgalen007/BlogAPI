import { IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginCredentials {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

export class RegisterCredentials {
  @IsString()
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  password!: string;
}
