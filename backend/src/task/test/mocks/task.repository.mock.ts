import { Task } from '@prisma/client';

import { CreateTaskDto } from '../../DTOs/create-task.dto';
import { TaskRepository } from '../../task.repository';

export class TaskRepositoryMock implements Required<TaskRepository> {
  private generateTasksDb(): Task[] {
    const tasks: Task[] = [
      {
        id: 1,
        content: 'test',
        done: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        content: 'test 2',
        done: false,
        createdAt: new Date(),
      },
    ];

    return tasks;
  }

  public async getMany(): Promise<Task[]> {
    return this.generateTasksDb();
  }

  public async get(id: number): Promise<Task> {
    return this.generateTasksDb()[0];
  }

  public async create(task: CreateTaskDto): Promise<Task> {
    return this.generateTasksDb()[0];
  }

  public async delete(id: number): Promise<void> {
    return;
  }

  public async markAsDone(id: number): Promise<Task> {
    return this.generateTasksDb()[0];
  }
}
