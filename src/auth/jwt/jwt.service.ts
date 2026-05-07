import { Injectable, UnauthorizedException } from '@nestjs/common'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
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
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!)
            return decoded
        }
        catch(err: unknown) {
            if (err instanceof JsonWebTokenError) {
                throw new UnauthorizedException('Invalid token')
            }
        }
    }
}
