import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, act,screen } from '@testing-library/react';
import Register from './Register'; // Make sure to import the correct path to your component
import TokenContext from '../context/TokenContext';
import axios from 'axios';

jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
  });
describe('Register component', () => {

  it('renders without errors', () => {
    const { getByText, getByPlaceholderText } = renderRegister();
    expect(getByText('Register')).toBeInTheDocument();
    expect(getByPlaceholderText('Full name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('displays an error message for invalid data', async () => {
    const { getByText } =renderRegister() ;
    axios.post.mockRejectedValue({ response: { data: { message: 'Login failed' } } });
    
    // Submit the form without filling in data
    const registerButton = getByText('Register');
     await act(async () => {
      fireEvent.click(registerButton);
    });


    // Assert that the error message is displayed
    expect(getByText('Login failed')).toBeInTheDocument(); // Replace 'Error message' with the actual error message displayed on error
  });

  it('submits the form with valid data', async () => {
    const { getByPlaceholderText, getByText } = renderRegister();

    axios.post.mockResolvedValue({data:{success:true,token:'1234',user:'user'}});
    // Simulate user input
    fireEvent.change(getByPlaceholderText('Full name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(getByPlaceholderText('Email address'), {
      target: { value: 'johndoe@example.com' },
    });
    fireEvent.change(getByPlaceholderText('Password'), {
      target: { value: 'secretpassword' },
    });

    // Submit the form
    const registerButton = getByText('Register');
    await act(async() => {
      fireEvent.click(registerButton);
    });
  });




});


const renderRegister = () => { 
    return render(
<TokenContext.Provider value={{userToken:'',tokenDispatch:jest.fn(),userDispatch:jest.fn()}}>
<Register />
</TokenContext.Provider> ) }
