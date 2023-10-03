import { Task } from '@prisma/client';

import { CreateTaskDto } from '../../DTOs/create-task.dto';
import { TaskResponse } from '../../responses/task.response';
import { TaskService } from '../../task.service';

export class TaskServiceMock implements Required<TaskService> {
  private generateTasksListResponse(): TaskResponse[] {
    const tasks: Task[] = [
      {
        id: 1,
        content: 'test',
        done: false,
      },
      {
        id: 2,
        content: 'test 2',
        done: false,
      },
    ];

    return tasks.map((task) => new TaskResponse(task));
  }

  public async create(task: CreateTaskDto): Promise<TaskResponse> {
    return this.generateTasksListResponse()[0];
  }

  public async delete(id: number): Promise<void> {
    return;
  }
}
