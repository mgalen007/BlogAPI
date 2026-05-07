import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
  Param,
  Query,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  async create(@Body(ValidationPipe) comment: CreateCommentDto) {
    const newComment = await this.commentsService.create(comment);
    return {
      success: true,
      message: 'Comment created successfully',
      data: {
        id: newComment.id,
        content: newComment.content,
        authorId: newComment.authorId,
      },
    };
  }

  @Get()
  async findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const comments = await this.commentsService.findAll(limit);
    return comments.length == 0
      ? { success: true, message: 'No comments yet' }
      : { success: true, data: comments };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const comment = await this.commentsService.findOne(id);
    return { success: true, data: comment };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body(ValidationPipe) comment: UpdateCommentDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const newComment = await this.commentsService.update(id, comment);
    return { success: true, data: newComment };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.commentsService.remove(id);
  }
}
