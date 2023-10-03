import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskDoesNotExistException extends HttpException {
  constructor() {
    super('Task with the given id does not exist.', HttpStatus.NOT_FOUND);
  }
}
