import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface UserRegisterProps {
  onUserRegistered: () => void;
}

const UserRegister: React.FC<UserRegisterProps> = ({ onUserRegistered }) => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // Add password state
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://172.18.7.85:2525/users/register', {
        username: userName,
        email: email,
        password: password, // Include password in the request
        role: 'user' // Assuming role is always 'user'
      });
      console.log('User registered:', response.data);
      if (onUserRegistered && typeof onUserRegistered === 'function') {
        onUserRegistered();
      }
      clearFields();
      toast.success('User registered successfully!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error if needed
    }
  };

  const clearFields = () => {
    setUserName('');
    setEmail('');
    setPassword(''); // Clear password field
  };

  return (
    <div className="flex items-center justify-center h-full mt-10">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>User Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">User Name</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button type="submit" >Register</Button>
              <Button onClick={() => navigate('/login')}>Go to Login</Button> {/* Add this button */}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRegister;