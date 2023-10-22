import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateTask from './CreateTask';
import { useContext } from 'react';
import '@testing-library/jest-dom'

// Mock the useContext and axios functions for testing

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(),
  }));
jest.mock('../../Axios/axios.js', () => ({
  post: jest.fn(),
}));

describe('CreateTask', () => {
  it('should render the CreateTask component', () => {
    const dispatch = jest.fn();
    const userToken = 'user-auth-token';

    useContext.mockReturnValueOnce({ dispatch });
    useContext.mockReturnValueOnce({ userToken });

    renderTask()

    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const addButton = screen.getByText('Add');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  it('should add a task when the form is submitted', async () => {
    const dispatch = jest.fn();
    const userToken = 'user-auth-token';
    const title = 'Test Task';
    const description = 'This is a test task';

    useContext.mockReturnValueOnce({ dispatch });
    useContext.mockReturnValueOnce({ userToken });

    renderTask()

    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const addButton = screen.getByText('Add');

    fireEvent.change(titleInput, { target: { value: title } });
    fireEvent.change(descriptionInput, { target: { value: description } });

    // Mock the axios post function
    const postMock = jest.fn(() => Promise.resolve({ data: {} }));
    require('../../Axios/axios.js').post = postMock;

    fireEvent.click(addButton);

  });
});


const renderTask = ( )  =>{
    render(<CreateTask />);

}