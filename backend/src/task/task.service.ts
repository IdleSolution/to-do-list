import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from './DTOs/create-task.dto';
import { TaskDoesNotExistException } from './errors/task-does-not-exist.exception';
import { TaskResponse } from './responses/task.response';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async list(): Promise<TaskResponse[]> {
    const tasks = await this.taskRepository.getMany();

    return tasks.map((task) => new TaskResponse(task));
  }

  public async create(task: CreateTaskDto): Promise<TaskResponse> {
    const createdTask = await this.taskRepository.create(task);

    return new TaskResponse(createdTask);
  }

  public async delete(id: number): Promise<void> {
    const task = await this.taskRepository.get(id);

    if (!task) {
      throw new TaskDoesNotExistException();
    }

    await this.taskRepository.delete(id);
  }
}
