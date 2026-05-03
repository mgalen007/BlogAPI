import { Controller, UseFilters, Get, Param } from '@nestjs/common';
import { PostsExceptionFilter } from '../filters/posts.filter'
import { PostsService } from './posts.service'

@Controller('posts')
@UseFilters(PostsExceptionFilter)
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const post = await this.postsService.findOne(id)
        return { success: true, data: post }
    }
}
