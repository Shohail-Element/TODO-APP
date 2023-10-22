import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios'; // Import axios
import { MemoryRouter } from 'react-router-dom'; // For using Navigate

import Login from './Login';
import '@testing-library/jest-dom'
import TokenContext from '../context/TokenContext';
import { act } from 'react-dom/test-utils';

jest.mock('axios'); // Mock axios

describe('Login Component', () => {
  // Define a mock token for your context
  const mockToken = {
    userToken: null,
    tokenDispatch: jest.fn(),
    userDispatch: jest.fn(),
  };

  it('should render the login form', () => {
    render(
      <TokenContext.Provider value={mockToken}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </TokenContext.Provider>
    );

    // Assert that the login form elements are present
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should handle a successful login', async () => {
    axios.post.mockResolvedValue({
      data: {
        token: 'your-mock-token',
        user: { id: 1, name: 'John' },
      },
    });

    render(
      <TokenContext.Provider value={mockToken}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </TokenContext.Provider>
    );

    // Simulate user input and submit the form
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByText('Login'));

  });

  it('should handle a login error', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Login failed' } } });

   const comp= render(
      <TokenContext.Provider value={mockToken}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </TokenContext.Provider>
    );

    // Simulate user input and submit the form
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'invalid-password' },
    });
   await act(async ()=>{
    fireEvent.click(screen.getByText('Login'));
   })

    // Wait for API call to complete
    expect(comp.getByText('Login failed')).toBeInTheDocument();
  });
});
