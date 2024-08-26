import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateBatch from '../forms/createBatch';
import CategoryTable from '../tables/CategoryTable'; // Import the CategoryTable component

const CategoryDashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAddCategory = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button onClick={handleAddCategory} className="mt-4">
        Add New Batch
      </Button>
      {/* Conditionally render the CreateCategory component as a modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseForm}></div>
          <div className="relative z-10 bg-white p-4 rounded-lg">
            <CreateBatch onClose={handleCloseForm} />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CategoryDashboard;
