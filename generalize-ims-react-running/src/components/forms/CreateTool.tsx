import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CreateToolProps {
  onClose: () => void;
  onToolAdded: () => void;
}

const CreateTool: React.FC<CreateToolProps> = ({ onClose, onToolAdded }) => {
  const [toolName, setToolName] = useState<string>('');
  const [quantityAvailable, setQuantityAvailable] = useState<number>(0);
  const [status, setStatus] = useState<string>('Available');
  const [location, setLocation] = useState<string>('');
  const [categoryID, setCategoryID] = useState<number>(1);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolName || quantityAvailable <= 0 || !status || !location || categoryID <= 0) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.27:8000/tools/', {
        ToolName: toolName,
        QuantityAvailable: quantityAvailable,
        Status: status,
        Location: location,
        CategoryID: categoryID
      });
      console.log('Response:', response.data);
      onToolAdded(); // Notify parent component to refresh the table
      onClose();
    } catch (err) {
      console.error('Error submitting request:', err);
      if (err.response && err.response.data) {
        setError(`Error: ${err.response.data.detail}`);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="toolName" className="block text-sm font-medium text-gray-700">Tool Name</label>
            <input
              type="text"
              id="toolName"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantityAvailable" className="block text-sm font-medium text-gray-700">Quantity Available</label>
            <input
              type="number"
              id="quantityAvailable"
              value={quantityAvailable}
              onChange={(e) => setQuantityAvailable(parseInt(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <input
              type="text"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categoryID" className="block text-sm font-medium text-gray-700">Category ID</label>
            <input
              type="number"
              id="categoryID"
              value={categoryID}
              onChange={(e) => setCategoryID(parseInt(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <CardFooter className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateTool;
