import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Login: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      Email: '',
      Password: '',
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://172.18.7.27:8000/tools/', data);
      console.log('user created successfully:', response.data);
    } catch (error) {
      console.error('Error creating tool:', error);
      // Handle error response here
    }
  };

  return (
    <Card className="w-[400px] m-auto mt-30 p-3">
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel htmlFor="Email">Email:</FormLabel>
              <FormControl>
                <Input id="Email" {...methods.register('Email')} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="Password">Password:</FormLabel>
              <FormControl>
                <Input id="Password" type="password" {...methods.register('Password')} />
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
              <button onClick={() => window.location.href = '/register'} className="text-sm text-blue-600 hover:text-blue-500">
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
