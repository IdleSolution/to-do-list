import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '@prisma/client';

import { CreateTaskDto } from '../../DTOs/create-task.dto';
import { TaskResponse } from '../../responses/task.response';
import { TaskController } from '../../task.controller';
import { TaskService } from '../../task.service';
import { TaskServiceMock } from '../mocks/task.service.mock';

describe('Task controller', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TaskService,
          useClass: TaskServiceMock,
        },
      ],
      controllers: [TaskController],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('Create task', () => {
    it('should create task and return TaskResponse', async () => {
      const createTaskServiceSpy = jest.spyOn(taskService, 'create');

      const createdTask: CreateTaskDto = {
        content: 'test',
      };

      const result: TaskResponse = await taskController.create(createdTask);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('done');

      expect(createTaskServiceSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete task', () => {
    it('should delete task', async () => {
      const deleteTaskServiceSpy = jest.spyOn(taskService, 'delete');

      await taskController.delete(1);

      expect(deleteTaskServiceSpy).toHaveBeenCalledTimes(1);
    });
  });
});
