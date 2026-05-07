import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { JwtModule } from '../auth/jwt/jwt.module'


@Module({
  imports: [JwtModule],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
