import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user)
      throw new NotFoundException('User with the specified ID was not found');
    return user;
  }

  async findAll(limit?: number) {
    const users = await this.prisma.user.findMany({
      select: { username: true, email: true, bio: true },
      ...(limit && { take: limit }),
    });
    return users;
  }
}
