import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CreateDepartmentProps {
  onClose: () => void;
}

const CreateDepartment: React.FC<CreateDepartmentProps> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.27:8000/departments/', { Name: name });
      console.log('Response:', response.data);
      onClose();
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Error submitting request');
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Department</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateDepartment;
