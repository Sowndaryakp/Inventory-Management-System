import React from 'react';
import { Card } from '@/components/ui/card'; // Import Card component
import DepartmentCard from '../components/allcards/DepartmentCard';
import CategoryCard from '../components/allcards/CategoryCard';
import ToolCard from '../components/allcards/ToolCard';

const AddDataDashboard: React.FC = () => {
  return (
    <>
    <div className="p-6">
    <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-1/2">
        <div className="overflow-x-auto">
             <DepartmentCard />
     </div>
        </Card>
        <Card className="w-full md:w-1/2">
        <div className="overflow-x-auto">
             <CategoryCard />
          </div>
        </Card>
    </div>
    <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
        <Card className="w-full md:w-2/4 mt-5">
        <div className="overflow-x-auto">
             <ToolCard />
        </div>
        </Card>
        
    </div>
    </div>
    </>
  );
};

export default AddDataDashboard;
