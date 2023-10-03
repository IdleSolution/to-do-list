import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '@prisma/client';

import { CreateTaskDto } from '../../DTOs/create-task.dto';
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
});
