import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CreateAddNewToolRequestProps {
  onClose: () => void;
}

const CreateAddNewToolRequest: React.FC<CreateAddNewToolRequestProps> = ({ onClose }) => {
  const [userId, setuserId] = useState<string>('');
  const [parentID, setParentID] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setError('userId is required');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.27:8000/api/v1/categories/', { 
        userId: userId,
        ParentID: parentID,
      });
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
        <CardTitle>Create AddNewToolRequest</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User Id</label>
            <input 
              type="text" 
              id="userId" 
              value={userId} 
              onChange={(e) => setuserId(e.target.value)} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="parentID" className="block text-sm font-medium text-gray-700">Parent ID (optional)</label>
            <input 
              type="number" 
              id="parentID" 
              value={parentID !== null ? parentID : ''} 
              onChange={(e) => setParentID(e.target.value ? parseInt(e.target.value) : null)} 
              className="mt-1 p-2 border border-gray-300 rounded-md w-full" 
            />
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

export default CreateAddNewToolRequest;
