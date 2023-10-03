import { Module } from '@nestjs/common';

import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, TaskRepository],
})
export class TaskModule {}
