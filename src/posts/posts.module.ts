import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule } from '../auth/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
