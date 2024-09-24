import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Location {
  LocationID: number;
  LocationName: string;
}

interface CreateLocationRequestProps {
  onClose: () => void;
}

const CreateLocationRequest: React.FC<CreateLocationRequestProps> = ({ onClose }) => {
  const [locationID, setLocationID] = useState<number>(0);
  const [locationName, setLocationName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://172.18.7.27:8000/api/locations/');
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName || !address) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://172.18.7.27:8000/api/locations/', {
        LocationName: locationName,
        Address: address,
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
        <CardTitle>Create New Location Request</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">Location Name</label>
            <input
              type="text"
              id="locationName"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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

export default CreateLocationRequest;
