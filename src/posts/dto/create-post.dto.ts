import { IsArray, IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  authorId!: string;

  @IsString()
  content!: string;

  @IsArray()
  @IsOptional()
  attachments?: string[];
}
