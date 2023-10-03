import { Body, Controller, Post } from '@nestjs/common';

import { CreateTaskDto } from './DTOs/create-task.dto';
import { TaskResponse } from './responses/task.response';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: CreateTaskDto): Promise<TaskResponse> {
    return await this.taskService.create(task);
  }
}
