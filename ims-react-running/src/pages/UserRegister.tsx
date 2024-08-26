import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"

interface UserRegisterProps {
  onUserRegistered: () => void;
}

const UserRegister: React.FC<UserRegisterProps> = ({ onUserRegistered }) => {
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [departmentID, setDepartmentID] = useState<number | ''>(''); // Change the default value to an empty string
  const { toast } = useToast(); // Initialize the existing toast library

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://172.18.7.27:8000/users/?department_id=1', {
        UserName: userName,
        Email: email,
        Phone: phone,
        Address: address,
        DepartmentID: departmentID
      });
      console.log('User registered:', response.data);
      if (onUserRegistered && typeof onUserRegistered === 'function') {
        onUserRegistered();
      }
      clearFields(); // Clear input fields after successful registration
      toast.success('User registered successfully!'); // Display toast message using the existing toast library
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error if needed
    }
  };

  const clearFields = () => {
    setUserName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setDepartmentID(''); // Reset department ID to an empty string
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
                required // Add required attribute for validation
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
                required // Add required attribute for validation
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required // Add required attribute for validation
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required // Add required attribute for validation
              />
            </div>
            <div className="mb-4">
              <label htmlFor="departmentID" className="block text-sm font-medium text-gray-700">Department ID</label>
              <input
                type="number"
                id="departmentID"
                value={departmentID}
                onChange={(e) => setDepartmentID(parseInt(e.target.value))}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button type="submit">Register</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRegister;

