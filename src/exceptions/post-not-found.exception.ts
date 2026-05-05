import { HttpException, HttpStatus } from '@nestjs/common';

export class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Post with ID ${id} was not found`, HttpStatus.NOT_FOUND);
  }
}
