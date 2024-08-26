import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToolTable from '../components/tables/ToolTableInventory';
import BatchTable from '../components/tables/BatchTable';
import SearchBatchId from '../components/tables/SearchBatchId';
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';
import AddNewToolRequest from '../components/allcards/AddNewToolRequest';
import AddNewBatchTools from '../components/allcards/AddNewBatchTools';import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const Batch: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Tool[]>('url');
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRequestClick = async (toolID: number) => {
    // Your handleRequestClick logic here
    console.log("tool id")
    console.log("tClicked")
    console.log(toolID)
  };

  return (
    <>
    <div className="p-6">
    <div className="flex flex-col md:flex-row md:space-x-4">
                <div>
                  <AddNewBatchTools />
                </div>
            </div>
    </div>

      <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-2/4">
        <div className="overflow-x-auto">
          <BatchTable tools={tools} onRequestClick={handleRequestClick} />
          </div>
        </Card>
        <Card className="w-full md:w-1/2">
        <SearchBatchId  />
        </Card>
    </div>
      
    </>
  );
};

export default Batch;
