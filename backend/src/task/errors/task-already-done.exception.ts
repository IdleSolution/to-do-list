import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskAlreadyDoneException extends HttpException {
  constructor() {
    super(
      'Task with the given id is already marked as done.',
      HttpStatus.CONFLICT,
    );
  }
}
