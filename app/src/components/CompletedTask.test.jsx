import React from 'react';
import { render, screen } from '@testing-library/react';
import CompletedTask from './CompletedTask';
import '@testing-library/jest-dom'

describe('CompletedTask', () => {
    
  it('renders the task title and description', () => {
    // Define a sample task
    const task = {
      title: 'Sample Task Title',
      description: 'This is a sample task description',
      createdAt: '2023-10-01T12:34:56', // A sample date
    };

    // Render the CompletedTask component with the sample task
    render(<CompletedTask task={task} />);

    // Assert that the task title and description are rendered
    const titleElement = screen.getByText('Sample Task Title');
    const descriptionElement = screen.getByText('This is a sample task description');
    
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders the "just now" message when createdAt is not provided', () => {
    // Define a sample task without a createdAt property
    const task = {
      title: 'Another Task',
      description: 'No date provided for this task',
    };

    // Render the CompletedTask component with the sample task
    render(<CompletedTask task={task} />);

    // Assert that the "just now" message is rendered
    const justNowElement = screen.getByText('just now');
    expect(justNowElement).toBeInTheDocument();
  });
});
