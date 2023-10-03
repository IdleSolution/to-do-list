import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '@prisma/client';

import { CreateTaskDto } from '../../DTOs/create-task.dto';
import { TaskResponse } from '../../responses/task.response';
import { TaskController } from '../../task.controller';
import { TaskService } from '../../task.service';
import { TaskServiceMock } from '../mocks/task.service.mock';

describe('Task controller', () => {
  let taskController: TaskController;

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
  });

  describe('create task', () => {
    it('should create task and return TaskResponse', async () => {
      const createdTask: CreateTaskDto = {
        content: 'test',
      };

      const result: TaskResponse = await taskController.create(createdTask);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('done');
    });
  });
});
