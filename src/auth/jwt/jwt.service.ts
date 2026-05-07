import { Injectable } from '@nestjs/common'
import jwt from 'jsonwebtoken'
import { type IUser } from '../../shared/types/user'

@Injectable() 
export class JwtService {
    sign(user: IUser) {
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '3d' }
        )
        return token
    }

    verify(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!)
        return decoded
    }
}
