import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import qs from 'qs'; // Import qs for query string serialization
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const methods = useForm({
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      console.log('Submitting data:', data); // Log the data being sent
      const response = await axios.post('http://172.18.7.85:2525/users/login', qs.stringify({
        grant_type: 'password',
        username: data.username,
        password: data.password,
        scope: '',
        client_id: '',
        client_secret: ''
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('User logged in successfully:', response.data);
      setIsAuthenticated(true); // Set authentication status to true on successful login
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error('Error logging in:', error);
      console.error('Full error object:', error); // Log the entire error object
      if (error.response) {
        console.error('Server responded with:', error.response.data); // Log server response
        // Display validation errors to the user
        const errorMessage = error.response.data.message || 'An error occurred';
        alert(`Error: ${errorMessage}`);
      } else {
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Card className="w-[400px] m-auto mt-30 p-3">
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel htmlFor="username">Username:</FormLabel>
              <FormControl>
                <Input id="username" {...methods.register('username')} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="password">Password:</FormLabel>
              <FormControl>
                <Input id="password" type="password" {...methods.register('password')} />
              </FormControl>
            </FormItem>
            <div className="flex items-center justify-between my-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <CardFooter className="flex justify-between w- p-4">
              <Button type="submit">Login</Button>
            </CardFooter>
            <div className="mt-6 flex justify-center items-center">
              <button type="button" onClick={() => navigate('/userregister')} className="text-sm text-blue-600 hover:text-blue-500">
                Don't have an account? Register here
              </button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default Login;