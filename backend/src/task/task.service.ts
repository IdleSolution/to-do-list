import { Injectable } from '@nestjs/common';

import { CreateTaskDto } from './DTOs/create-task.dto';
import { TaskAlreadyDoneException } from './errors/task-already-done.exception';
import { TaskDoesNotExistException } from './errors/task-does-not-exist.exception';
import { TaskResponse } from './responses/task.response';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async create(task: CreateTaskDto): Promise<TaskResponse> {
    const createdTask = await this.taskRepository.create(task);

    return new TaskResponse(createdTask);
  }

  public async delete(id: number): Promise<void> {
    await this.getTaskById(id);

    await this.taskRepository.delete(id);
  }

  public async markAsDone(id: number): Promise<TaskResponse> {
    let task = await this.getTaskById(id);

    if (task.done) {
      throw new TaskAlreadyDoneException();
    }

    task = await this.taskRepository.markAsDone(id);

    return new TaskResponse(task);
  }

  private async getTaskById(id: number) {
    const task = await this.taskRepository.get(id);

    if (!task) {
      throw new TaskDoesNotExistException();
    }

    return task;
  }
}
