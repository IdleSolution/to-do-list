import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';

import { CreateTaskDto } from './DTOs/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(task: CreateTaskDto): Promise<Task> {
    return await this.prismaService.task.create({
      data: {
        content: task.content,
      },
    });
  }
}
