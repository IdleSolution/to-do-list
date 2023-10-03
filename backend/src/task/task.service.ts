import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from './DTOs/create-task.dto';
import { TaskResponse } from './responses/task.response';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(task: CreateTaskDto): Promise<TaskResponse> {
    const createdTask = await this.taskRepository.create(task);

    return new TaskResponse(createdTask);
  }
}
