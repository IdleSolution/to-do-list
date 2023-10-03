import { Task } from '@prisma/client';

export class TaskResponse {
  constructor(task: Task) {
    this.id = task.id;
    this.content = task.content;
    this.done = task.done;
  }

  id: number;
  content: string;
  done: boolean;
}
