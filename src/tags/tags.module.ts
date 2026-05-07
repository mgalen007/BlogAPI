import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { JwtModule } from '../auth/jwt/jwt.module'

@Module({
  imports: [JwtModule],
  providers: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
