import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateTool from '../forms/CreateTool';
import ToolTable from '../tables/ToolTable'; // Import the ToolTable component

const ToolCard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false); // State to trigger table refresh

  const handleAddTool = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleToolAdded = () => {
    setRefreshTable(true); // Trigger table refresh
  };

  const handleTableRefreshed = () => {
    setRefreshTable(false); // Reset table refresh state
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Button onClick={handleAddTool} className="mt-4">
        Add Tool
      </Button>
      {/* Conditionally render the CreateTool component as a modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseForm}></div>
          <div className="relative z-10 bg-white p-4 rounded-lg">
            <CreateTool onClose={handleCloseForm} onToolAdded={handleToolAdded} />
          </div>
        </div>
      )}
      
      {/* Render the ToolTable component */}
      <div className="mt-4 overflow-x-auto">
        <ToolTable refreshTable={refreshTable} onTableRefreshed={handleTableRefreshed} />
      </div>
    </div>
  );
};

export default ToolCard;
