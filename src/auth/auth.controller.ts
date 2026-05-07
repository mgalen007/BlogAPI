import { Controller, Post, HttpCode, HttpStatus, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service'
import { LoginCredentials, RegisterCredentials } from './types/credentials'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body(ValidationPipe) { username, password }: LoginCredentials) {
        const token = await this.authService.login(username, password)
        return {
            success: true,
            message: 'Successfully logged in',
            data: { token }
        }
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body(ValidationPipe) info: RegisterCredentials) {
        const hash = await this.authService.hash(info.password)
        const newUser = await this.authService.register({
            username: info.username,
            passwordHash: hash,
            bio: info.bio,
            email: info.email
        })
        return {
            success: true,
            message: 'User created successfully',
            data: {
                id: newUser.id,
                username: newUser.username,
                bio: newUser.bio,
                email: newUser.email
            }
        }
    }
}
