import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs'
import { UsersService } from '../users/users.service'
import { JwtService } from './jwt/jwt.service'
import type { IUser } from '../shared/types/user'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Injectable()
export class AuthService {
    // Handles login and registration
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(username: string, password: string) {
        const user = await this.usersService.findByUsername(username)
        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) throw new UnauthorizedException('Invalid credentials')
        return this.jwtService.sign(user)
    }

    async register(user: CreateUserDto) {
        const newUser = await this.usersService.create(user)
        return newUser
        // { 
        //     id: newUser.id,
        //     username: newUser.username,
        //     bio: newUser.bio,
        //     email: newUser.email
        // }
    }

    async hash(password: string) {
        const hash = await bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS!)
        return hash
    }
}
