import {
  Controller,
  UseFilters,
  Get,
  Post,
  Put,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe,
  Body,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { PostsExceptionFilter } from '../filters/posts.filter';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('posts')
@UseFilters(PostsExceptionFilter)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const post = await this.postsService.findOne(id);
    return { success: true, data: post };
  }

  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
  ) {
    const posts = await this.postsService.findAll(limit);
    if (posts.length == 0)
      return {
        success: true,
        message: 'No posts yet',
        data: null,
      };
    return { success: true, data: posts };
  }

  @Post()
  async create(@Body(ValidationPipe) body: CreatePostDto) {
    const post = await this.postsService.create(body);
    return { success: true, data: post };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) body: UpdatePostDto,
  ): Promise<void> {
    await this.postsService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.postsService.remove(id);
  }
}
