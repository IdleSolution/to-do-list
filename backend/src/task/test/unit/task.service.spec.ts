import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '@prisma/client';

import { CreateTaskDto } from '../../DTOs/create-task.dto';
import { TaskAlreadyDoneException } from '../../errors/task-already-done.exception';
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

<<<<<<< HEAD
  describe('Get tasks', () => {
    it('should return all tasks', async () => {
      const getManyTasksSpy = jest.spyOn(taskRepository, 'getMany');

      const result: TaskResponse[] = await taskService.list();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(2);

      result.forEach((task) => {
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('content');
        expect(task).toHaveProperty('done');
      });

      expect(getManyTasksSpy).toHaveBeenCalledTimes(1);
=======
  describe('Mark task as done', () => {
    it('should mark task as done', async () => {
      const markAsDoneServiceSpy = jest.spyOn(taskRepository, 'markAsDone');

      const result: TaskResponse = await taskService.markAsDone(1);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('content');
      expect(result).toHaveProperty('done');

      expect(markAsDoneServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error on non existing task', async () => {
      const getTaskSpy = jest
        .spyOn(taskRepository, 'get')
        .mockResolvedValue(null);

      const markAsDoneRepositorySpy = jest.spyOn(taskRepository, 'markAsDone');

      await expect(async () => taskService.markAsDone(1)).rejects.toThrow(
        TaskDoesNotExistException,
      );

      expect(markAsDoneRepositorySpy).toHaveBeenCalledTimes(0);
      expect(getTaskSpy).toHaveBeenCalledTimes(1);
    });

    it('should throw error when task is already done', async () => {
      const markAsDoneRepositorySpy = jest.spyOn(taskRepository, 'markAsDone');

      const getTaskRepositorySpy = jest
        .spyOn(taskRepository, 'get')
        .mockResolvedValue({
          id: 1,
          content: 'test',
          done: true,
        });

      await expect(async () => taskService.markAsDone(1)).rejects.toThrow(
        TaskAlreadyDoneException,
      );

      expect(markAsDoneRepositorySpy).toHaveBeenCalledTimes(0);
      expect(getTaskRepositorySpy).toHaveBeenCalledTimes(1);
>>>>>>> 5d93eb6 (feat(backend): mark task as done)
    });
  });
});
