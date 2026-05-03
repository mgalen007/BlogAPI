import {
  Controller,
  Param,
  Query,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    const { username, email } = user;
    const bio = user.bio ?? null;
    return { success: true, data: { username, email, bio } };
  }

  @Get()
  async findAll(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    const users = await this.usersService.findAll(limit)
    return !users
      ? { success: true, message: 'No users yet', data: null }
      : { success: true, data: users }
  }
}
