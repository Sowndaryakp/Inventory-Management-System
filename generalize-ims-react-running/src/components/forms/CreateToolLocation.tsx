import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Select from 'react-select';
import { Modal } from 'antd'; // Import Modal from Ant Design

interface Option {
  value: number;
  label: string;
}

interface CreateToolLocationRequestProps {
  onClose: () => void;
}

const CreateToolLocationRequest: React.FC<CreateToolLocationRequestProps> = ({ onClose }) => {
  const [toolIDOptions, setToolOptions] = useState<Option[]>([]);
  const [locationIDOptions, setLocationIDOptions] = useState<Option[]>([]);
  const [toolID, setToolID] = useState<number | null>(null);
  const [locationID, setLocationID] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  useEffect(() => {
    fetchToolIDOptions();
    fetchLocationIDOptions();
  }, []);

  const fetchToolIDOptions = async () => {
    try {
      const response = await axios.get('http://172.18.7.27:8000/tools');
      const tools: Tool[] = response.data;

      const options = tools.map(tool => ({
        value: tool.ToolID,
        label: `${tool.ToolName} (ID: ${tool.ToolID})`,
      }));

      setToolOptions(options);
    } catch (error) {
      console.error('Error fetching tool options:', error);
    }
  };

  const fetchLocationIDOptions = async () => {
    try {
      const response = await axios.get('http://172.18.7.27:8000/api/tool-locations/?skip=0&limit=10');
      const options = response.data.map((location: any) => ({
        value: location.LocationID,
        label: `${location.LocationID}`,
      }));
      setLocationIDOptions(options);
    } catch (error) {
      console.error('Error fetching location IDs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toolID || !locationID || !quantity) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.27:8000/api/tool-locations/', {
        ToolID: toolID,
        LocationID: locationID,
        Quantity: quantity,
      });
      console.log('Response:', response.data);
      setModalMessage('Tool location added successfully');
      setSuccessModalVisible(true); // Show success modal
      onClose();
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Error submitting request');
    }
  };

  const handleModalOk = () => {
    setSuccessModalVisible(false);
    setModalMessage('');
    setToolID(null); // Reset form fields
    setLocationID(null);
    setQuantity(0);
  };

  const handleModalCancel = () => {
    setSuccessModalVisible(false);
    setModalMessage('');
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create New Tool Location</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="toolID" className="block text-sm font-medium text-gray-700">Tool ID</label>
            <Select
              id="toolID"
              options={toolIDOptions}
              onChange={(option: Option | null) => setToolID(option?.value || null)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="locationID" className="block text-sm font-medium text-gray-700">Location ID</label>
            <Select
              id="locationID"
              options={locationIDOptions}
              onChange={(option: Option | null) => setLocationID(option?.value || null)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
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

      <Modal
        title="Success"
        visible={successModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>{modalMessage}</p>
      </Modal>
    </Card>
  );
};

export default CreateToolLocationRequest;
