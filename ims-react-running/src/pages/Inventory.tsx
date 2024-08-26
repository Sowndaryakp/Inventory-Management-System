import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToolTable from '../components/tables/ToolTableInventory';
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';
import AddNewToolRequest from '../components/allcards/AddNewToolRequest';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Inventory: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Tool[]>('http://172.18.7.27:8000/tools');
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
    <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-1/4">
                    <TotalToolsHomeBoxCard />
                </div>
                <div className="mb-7">
                  <AddNewToolRequest />
                </div>
                {/* <div >
                    <TotalToolsHomeBoxCard />
                </div>
                <div >
                    <TotalToolsHomeBoxCard />
                </div>
                <div>
                    <TotalToolsHomeBoxCard />
                </div> */}
            </div>
      {/* Your other components */}

        <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full ">
        <div className="overflow-x-auto ">
        <ToolTable tools={tools} onRequestClick={handleRequestClick} />
          </div>
        </Card>
        
    </div>
      
    </>
  );
};

export default Inventory;
