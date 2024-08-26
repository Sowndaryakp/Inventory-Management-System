import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToolTable from '../components/tables/ToolTableInventory'; // Import ToolTable component
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';

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
    <div className="p-6">
    <TotalToolsHomeBoxCard />
    </div>
      {/* Your other components */}
      <div className="overflow-auto max-w-full">
        <ToolTable tools={tools} onRequestClick={handleRequestClick} />
      </div>
      
    </>
  );
};

export default Inventory;
