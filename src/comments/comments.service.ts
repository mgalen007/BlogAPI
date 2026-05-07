import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(limit?: number) {
    const comments = await this.prisma.comment.findMany({
      ...(limit && { take: limit }),
    });
    return comments;
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment)
      throw new NotFoundException(`Comment with id ${id} not found`);
    return comment;
  }

  async create(comment: CreateCommentDto) {
    const newComment = await this.prisma.comment.create({ data: comment });
    return newComment;
  }

  async update(id: string, comment: UpdateCommentDto) {
    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: comment,
    });
    if (!updatedComment)
      throw new NotFoundException(`Comment with id ${id} not found`);
    return updatedComment;
  }

  async remove(id: string) {
    const comment = await this.prisma.comment.delete({ where: { id } });
    if (!comment)
      throw new NotFoundException(`Comment with id ${id} not found`);
  }
}
