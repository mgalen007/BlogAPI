import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { PostNotFoundException } from '../exceptions/post-not-found.exception'
import { Response } from 'express'

@Catch(PostNotFoundException)
export class PostsExceptionFilter implements ExceptionFilter {
    catch(exception: PostNotFoundException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const res = ctx.getResponse<Response>()

        res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            success: false,
            message: exception.message
        })
    }
} 