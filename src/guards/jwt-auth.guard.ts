import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '../auth/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    const decoded = this.jwtService.verify(token);
    if (!decoded) throw new UnauthorizedException('Invalid token provided');
    req['user'] = decoded;

    return true;
  }
}
