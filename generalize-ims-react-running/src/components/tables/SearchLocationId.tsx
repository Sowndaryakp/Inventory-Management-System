import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table } from 'antd';
import { Search } from 'lucide-react';

const SearchLocationId: React.FC = () => {
  const [locationID, setLocationID] = useState<string>('');
  const [locationDetails, setLocationDetails] = useState<any | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    if (!locationID) {
      setError('Location ID is required');
      return;
    }

    try {
      const response = await axios.get(`http://172.18.7.27:8000/api/locations/${locationID}`);
      setLocationDetails(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching location details:', err);
      setError('Error fetching location details');
      setLocationDetails(null);
    }
  };

  const columns = [
    {
      title: 'Location ID',
      dataIndex: 'LocationID',
      key: 'LocationID',
    },
    {
      title: 'Location Name',
      dataIndex: 'LocationName',
      key: 'LocationName',
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
    },
  ];

  return (
    <Card className="w-auto mx-auto">
      <CardContent className="w-96 ">
        <div className="mt-2 -mb-6 flex items-center">
          <label htmlFor="locationID" className="block text-base font-medium text-gray-700 mr-2">Location_ID</label>
          <div className="relative flex-grow">
            <input
              type="text"
              id="locationID"
              value={locationID}
              onChange={(e) => setLocationID(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full pl-8"
            />
            <Search className="absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400" />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button onClick={handleSearch} className="mt-1 ml-4">Search</Button>
        </div>
      </CardContent>
      <CardFooter>
        {locationDetails && (
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={[locationDetails]}
              rowKey="LocationID"
              bordered
              // pagination={false}
              className="w-full"
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SearchLocationId;
