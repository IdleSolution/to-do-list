import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockTaskValue = 'Sample Task';

  beforeEach(() => {
    mockHandleChange.mockClear();
    mockHandleSubmit.mockClear();
  });

  it('renders input and submit button correctly', () => {
    render(
      <Input
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        taskValue={mockTaskValue}
      />
    );

    const inputElement = screen.getByPlaceholderText('Add new task...');
    expect(inputElement).toBeInTheDocument();

    const submitButton = screen.getByTestId('submitButton');
    expect(submitButton).toBeInTheDocument();
  });

  it('calls handleChange when input value changes', () => {
    render(
      <Input
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        taskValue={mockTaskValue}
      />
    );

    const inputElement = screen.getByPlaceholderText('Add new task...');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('calls handleSubmit when submit button is clicked', () => {
    render(
      <Input
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        taskValue={mockTaskValue}
      />
    );

    const submitButton = screen.getByTestId('submitButton');
    fireEvent.click(submitButton);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});