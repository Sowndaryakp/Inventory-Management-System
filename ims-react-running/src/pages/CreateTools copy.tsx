import React, { useState } from 'react';
import axios from 'axios';

const CreateTools: React.FC = () => {
  const [toolData, setToolData] = useState({
    ToolName: '',
    QuantityAvailable: 0,
    Status: 'Available',
    Location: '',
  });
  const [response, setResponse] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setToolData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://172.18.7.27:8000/tools/', toolData);
      setResponse(response.data);
    } catch (error) {
      console.error('Error creating tool:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Create New Tool</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="ToolName" className="block text-sm font-medium text-gray-700">Tool Name</label>
            <input type="text" id="ToolName" name="ToolName" value={toolData.ToolName} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="QuantityAvailable" className="block text-sm font-medium text-gray-700">Quantity Available</label>
            <input type="number" id="QuantityAvailable" name="QuantityAvailable" value={toolData.QuantityAvailable} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label htmlFor="Location" className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" id="Location" name="Location" value={toolData.Location} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Tool</button>
        </form>
      </div>
      {response && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <strong>Success:</strong> Tool created successfully! Tool ID: {response.ToolID}
        </div>
      )}
    </div>
  );
};

export default CreateTools;
