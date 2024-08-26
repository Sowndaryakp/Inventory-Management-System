import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table } from 'antd';
import { Search } from 'lucide-react';

const SearchBatchId: React.FC = () => {
  const [batchID, setBatchID] = useState<string>('');
  const [batchDetails, setBatchDetails] = useState<any | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    if (!batchID) {
      setError('Batch ID is required');
      return;
    }

    try {
      const response = await axios.get(`http://172.18.7.27:8000/api/${batchID}`);
      setBatchDetails(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching batch details:', err);
      setError('Error fetching batch details');
      setBatchDetails(null);
    }
  };

  const columns = [
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
    },
    {
      title: 'Batch Number',
      dataIndex: 'BatchNumber',
      key: 'BatchNumber',
    },
    {
      title: 'Manufacture Date',
      dataIndex: 'ManufactureDate',
      key: 'ManufactureDate',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'ExpiryDate',
      key: 'ExpiryDate',
    },
    {
      title: 'Batch ID',
      dataIndex: 'BatchID',
      key: 'BatchID',
    },
  ];

  return (
    <Card className="w-auto mx-auto">
      <CardContent className="w-96 ">
        <div className="mt-2 -mb-6 flex items-center">
          <label htmlFor="batchID" className="block text-base font-medium text-gray-700 mr-2">Batch_ID</label>
          <div className="relative flex-grow">
            <input
              type="text"
              id="batchID"
              value={batchID}
              onChange={(e) => setBatchID(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full pl-8"
            />
            <Search className="absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400" />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <Button onClick={handleSearch} className="mt-1 ml-4">Search</Button>
        </div>
      </CardContent>
      <CardFooter>
        {batchDetails && (
           <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={[batchDetails]}
            rowKey="BatchID"
            // pagination={false}
            bordered
            className="w-full"
          />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default SearchBatchId;
