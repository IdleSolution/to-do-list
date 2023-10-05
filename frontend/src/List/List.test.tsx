import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';

describe('List component', () => {
  const mockTasks = [
    { id: 1, content: 'Task 1', done: false },
    { id: 2, content: 'Task 2', done: true },
  ];

  const mockMarkTaskAsDone = jest.fn();
  const mockRemoveTask = jest.fn();

  it('renders a list of tasks correctly', () => {
    render(
      <List
        tasks={mockTasks}
        markTaskAsDone={mockMarkTaskAsDone}
        removeTask={mockRemoveTask}
      />
    );

    mockTasks.forEach((task) => {
      const taskElement = screen.getByText(task.content);
      expect(taskElement).toBeInTheDocument();
    });
  });

});