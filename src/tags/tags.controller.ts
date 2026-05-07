import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  ParseIntPipe,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const tags = await this.tagsService.findAll(limit);
    return !tags
      ? { success: true, message: 'No tags yet', data: null }
      : { success: true, data: tags };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const tag = await this.tagsService.findOne(id);
    return { success: true, data: tag };
  }

  @Post()
  async create(@Body(ValidationPipe) body: CreateTagDto) {
    const tag = await this.tagsService.create(body);
    return { success: true, message: 'Tag created successfully', data: tag };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async update(
    @Body(ValidationPipe) body: UpdateTagDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    await this.tagsService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.tagsService.remove(id);
  }
}
