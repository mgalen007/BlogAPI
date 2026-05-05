import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(tag: CreateTagDto) {
    const newTag = await this.prisma.tag.create({ data: tag });
    return newTag;
  }

  async findOne(id: string) {
    const tag = await this.prisma.tag.findFirst({ where: { id } });
    if (!tag) throw new NotFoundException('Tag with specified ID not found');
    return tag;
  }

  async findAll(limit?: number) {
    const tags = await this.prisma.tag.findMany({
      ...(limit && { take: limit }),
    });
    if (tags.length == 0) return null;
    return tags;
  }

  async remove(id: string): Promise<void> {
    const tag = await this.prisma.tag.delete({ where: { id } });
    if (!tag) throw new NotFoundException('Tag with specified ID not found');
  }

  async update(id: string, newTag: UpdateTagDto): Promise<void> {
    const oldTag = await this.prisma.tag.update({
      where: { id },
      data: newTag,
    });
    if (!oldTag) throw new NotFoundException('Tag with specified ID not found');
  }
}
