import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Task from './Task';

const mockTask = {
  id: 1,
  content: 'Sample Task',
  done: false,
};

const mockMarkTaskAsDone = jest.fn();
const mockRemoveTask = jest.fn();

describe('Task component', () => {
  it('renders task content and buttons correctly', () => {
    render(
        <Task
          task={mockTask}
          markTaskAsDone={mockMarkTaskAsDone}
          removeTask={mockRemoveTask}
        />
    );

    expect(screen.getByText('Sample Task')).toBeInTheDocument();

    const markAsDoneButton = screen.getByTestId('markAsDoneButton');
    expect(markAsDoneButton).toBeInTheDocument();

    const removeTaskButton = screen.getByTestId('removeTaskButton');
    expect(removeTaskButton).toBeInTheDocument();
  });

  it('calls markTaskAsDone when mark as done button is clicked', () => {
    render(
      <Task
        task={mockTask}
        markTaskAsDone={mockMarkTaskAsDone}
        removeTask={mockRemoveTask}
      />
    );

    const markAsDoneButton = screen.getByTestId('markAsDoneButton');
    fireEvent.click(markAsDoneButton);

    expect(mockMarkTaskAsDone).toHaveBeenCalledWith(1);
  });

  it('calls removeTask when remove task button is clicked', () => {
    render(
      <Task
        task={mockTask}
        markTaskAsDone={mockMarkTaskAsDone}
        removeTask={mockRemoveTask}
      />
    );

    const removeTaskButton = screen.getByTestId('removeTaskButton');
    fireEvent.click(removeTaskButton);

    expect(mockRemoveTask).toHaveBeenCalledWith(1);
  });
});