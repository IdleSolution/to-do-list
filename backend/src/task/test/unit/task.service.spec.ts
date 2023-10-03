import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '@prisma/client';

import { CreateTaskDto } from '../../DTOs/create-task.dto';
import { TaskDoesNotExistException } from '../../errors/task-does-not-exist.exception';
import { TaskResponse } from '../../responses/task.response';
import { TaskRepository } from '../../task.repository';
import { TaskService } from '../../task.service';
import { TaskRepositoryMock } from '../mocks/task.repository.mock';

describe('Task service', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useClass: TaskRepositoryMock,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Create task', () => {
    it('should create task and return TaskResponse', async () => {
      const createTaskSpy = jest.spyOn(taskRepository, 'create');

      const createdTask: CreateTaskDto = {
        content: 'test',
      };

      const result: TaskResponse = await taskService.create(createdTask);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('done');

      expect(createTaskSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete task', () => {
    it('should delete task', async () => {
      const deleteTaskSpy = jest.spyOn(taskRepository, 'delete');
      const getTaskSpy = jest.spyOn(taskRepository, 'get');

      await taskService.delete(1);

      expect(deleteTaskSpy).toHaveBeenCalledTimes(1);
      expect(getTaskSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error on non existing task', async () => {
      const getTaskSpy = jest
        .spyOn(taskRepository, 'get')
        .mockResolvedValue(null);

      const deleteTaskSpy = jest.spyOn(taskRepository, 'delete');

      await expect(async () => taskService.delete(1)).rejects.toThrow(
        TaskDoesNotExistException,
      );

      expect(deleteTaskSpy).toHaveBeenCalledTimes(0);
      expect(getTaskSpy).toHaveBeenCalledTimes(1);
    });
  });
});
