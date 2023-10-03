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

  afterEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Create task', () => {
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

  describe('Delete task', () => {
    it('should delete task', async () => {
      const mockPrismaDeleteTask = jest
        .spyOn(prismaService.task, 'delete')
        .mockResolvedValue({
          id: 1,
          content: 'test',
          done: false,
        });

      await taskRepository.delete(1);

      expect(mockPrismaDeleteTask).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mark task as done', () => {
    it('should mark task as done', async () => {
      const mockPrismaUpdateTask = jest
        .spyOn(prismaService.task, 'update')
        .mockResolvedValue({
          id: 1,
          content: 'test',
          done: true,
        });

      const result: Task = await taskRepository.markAsDone(1);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('done');

      expect(mockPrismaUpdateTask).toHaveBeenCalledTimes(1);
    });
  });
});
