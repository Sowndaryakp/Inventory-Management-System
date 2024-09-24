import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationTable from '../components/tables/LocationTable';
import ToolsLocationTable from '../components/tables/ToolsLocationTable';
import SearchLocationId from '../components/tables/SearchLocationId';
import AddNewLocationTools from '../components/allcards/AddNewLocationTools';
import AddNewToolLocations from '../components/allcards/AddNewToolLocations';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


const Location: React.FC = () => {
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
    <div className="p-3">
    <div className="flex flex-col md:flex-row md:space-x-4">
                <div>
                  <AddNewLocationTools />
                </div>
                <div>
                  <AddNewToolLocations />
                </div>
            </div>
    </div>


    <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-2/4">
        <div className="overflow-x-auto">
        <LocationTable tools={tools} onRequestClick={handleRequestClick} />
          </div>
        </Card>
        <Card className="w-full md:w-1/2">
        <ToolsLocationTable tools={tools} onRequestClick={handleRequestClick} />
        </Card>
    </div>


      {/*<div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-2/4">
        <div className="overflow-x-auto">
          <LocationTable tools={tools} onRequestClick={handleRequestClick} />
          </div>
        </Card>
       <Card className="w-full md:w-1/2">
        <SearchLocationId  />
        </Card> 
    </div>
    {/*<div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-2/4">
        <div className="overflow-x-auto">
       
          <ToolsLocationTable tools={tools} onRequestClick={handleRequestClick} />
          </div>
        </Card>
    </div>*/}
      
    </>
  );
};

export default Location;
