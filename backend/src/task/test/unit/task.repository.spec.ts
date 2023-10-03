import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '@prisma/client';

import { PrismaService } from '../../../prisma/prisma.service';
import { CreateTaskDto } from '../../DTOs/create-task.dto';
import { TaskRepository } from '../../task.repository';

describe('Task repository', () => {
  let taskRepository: TaskRepository;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskRepository, PrismaService],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create task', () => {
    it('should create task and return Task', async () => {
      const createdTask: CreateTaskDto = {
        content: 'test',
      };

      const mockPrismaCreateTask = jest
        .spyOn(prismaService.task, 'create')
        .mockResolvedValue({
          id: 1,
          content: 'test',
          done: false,
        });

      const result: Task = await taskRepository.create(createdTask);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('done');

      expect(mockPrismaCreateTask).toHaveBeenCalledTimes(1);
    });
  });
});
