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

  describe('Get tasks', () => {
    it('should return all tasks', async () => {
      const mockPrismaFindManyTask = jest
        .spyOn(prismaService.task, 'findMany')
        .mockResolvedValue([
          {
            id: 1,
            content: 'test',
            done: false,
          },
        ]);

      const result = await taskRepository.getMany();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);

      result.forEach((task) => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('content');
        expect(task).toHaveProperty('done');
      });

      expect(mockPrismaFindManyTask).toHaveBeenCalledTimes(1);
    });
  });
});
