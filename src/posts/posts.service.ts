import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostNotFoundException } from '../exceptions/post-not-found.exception'

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async create(post: CreatePostDto) {
        const newPost = await this.prisma.post.create({ data: post })
        return newPost
    }

    async findOne(id: string) {
        const post = await this.prisma.post.findUnique({ where: { id } })
        if (!post) throw new PostNotFoundException(id)
        return post
    }

    async findAll(limit?: number) {
        const posts = await this.prisma.post.findMany({
            ...(limit && { take: limit })
        })
        return posts
    }

    async update(id: string, newPost: UpdatePostDto): Promise<void> {
        const oldPost = await this.prisma.post.update({
            where: { id },
            data: newPost
        })
        if (!oldPost) throw new NotFoundException('Post with specified ID not found')
    }

    async remove(id: string) {
        const post = await this.prisma.post.delete({ where: { id } })
        if (!post) throw new NotFoundException('Post with specified ID not found')
    }
}
