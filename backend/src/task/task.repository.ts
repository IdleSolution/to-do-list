import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

import { CreateTaskDto } from './DTOs/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async get(id: number): Promise<Task> {
    return await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
  }

  public async create(task: CreateTaskDto): Promise<Task> {
    return await this.prismaService.task.create({
      data: {
        content: task.content,
      },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prismaService.task.delete({
      where: {
        id,
      },
    });
  }

  public async markAsDone(id: number): Promise<Task> {
    return await this.prismaService.task.update({
      where: { id },
      data: {
        done: true,
      },
    });
  }
}
