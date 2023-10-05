import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Input from './Input';

describe('Input component', () => {
  it('renders input and button correctly', () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();
    const taskValue = 'Test task';

     render(
      <Input
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        taskValue={taskValue}
      />
    );

    const inputElement = screen.getByPlaceholderText('Add new task...');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByTestId('submitButton');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls handleChange when input value changes', () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();
    const taskValue = 'Test task';

     render(
      <Input
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        taskValue={taskValue}
      />
    );

    const inputElement = screen.getByPlaceholderText('Add new task...');

    fireEvent.change(inputElement, { target: { value: 'New value' } });

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        value: 'New value',
      }),
    }));
  });

  it('calls handleSubmit when the button is clicked', () => {
    const handleChange = jest.fn();
    const handleSubmit = jest.fn();
    const taskValue = 'Test task';

     render(
      <Input
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        taskValue={taskValue}
      />
    );

    const buttonElement = screen.getByTestId('submitButton');
    

  })
})