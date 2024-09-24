import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Tool {
  ToolID: number;
  ToolName: string;
}

interface CreateToolRequestProps {
  onClose: () => void;
}

const CreateToolRequest: React.FC<CreateToolRequestProps> = ({ onClose }) => {
  const [toolID, setToolID] = useState<number>(0);
  const [batchNumber, setBatchNumber] = useState<string>('');
  const [manufactureDate, setManufactureDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://172.18.7.27:8000/tools');
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolID || !batchNumber || !manufactureDate || !expiryDate) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.27:8000/api/', {
        ToolID: toolID,
        BatchNumber: batchNumber,
        ManufactureDate: manufactureDate,
        ExpiryDate: expiryDate,
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
        <CardTitle>Create New Tool Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="toolID" className="block text-sm font-medium text-gray-700">Tool ID</label>
            <select
              id="toolID"
              value={toolID}
              onChange={(e) => setToolID(parseInt(e.target.value))}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select a Tool</option>
              {tools.map((tool) => (
                <option key={tool.ToolID} value={tool.ToolID}>
                  {tool.ToolID} - {tool.ToolName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700">Batch Number</label>
            <input
              type="text"
              id="batchNumber"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="manufactureDate" className="block text-sm font-medium text-gray-700">Manufacture Date</label>
            <input
              type="datetime-local"
              id="manufactureDate"
              value={manufactureDate}
              onChange={(e) => setManufactureDate(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="datetime-local"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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

export default CreateToolRequest;
