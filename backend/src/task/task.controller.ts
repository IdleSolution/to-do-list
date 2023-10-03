import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { CreateTaskDto } from './DTOs/create-task.dto';
import { TaskResponse } from './responses/task.response';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  public async create(@Body() task: CreateTaskDto): Promise<TaskResponse> {
    return await this.taskService.create(task);
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.taskService.delete(id);
  }
}
