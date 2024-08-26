import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RequestCard from '../RequestCard'; // Import RequestCard component

interface Tool {
  ToolName: string;
  QuantityAvailable: number;
  Status: string;
  Location: string;
  ToolID: number;
  LastUpdated: string | null;
}

interface ToolTableProps {
  tools: Tool[];
}

const ToolTable: React.FC<ToolTableProps> = ({ tools }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const handleRequestClick = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleCloseRequestCard = () => {
    setSelectedTool(null);
  };

  return (
    <>
      <div className="overflow-auto max-w-full">
        <Table className="min-w-full sm:min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 p-2">ToolName</TableHead>
              <TableHead className="w-1/6 p-2">QuantityAvailable</TableHead>
              <TableHead className="w-1/6 p-2">Status</TableHead>
              <TableHead className="w-1/6 p-2">Location</TableHead>
              <TableHead className="w-1/6 p-2">ToolID</TableHead>
              <TableHead className="w-1/6 p-2">LastUpdated</TableHead>
              <TableHead className="w-1/6 p-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.map((tool, index) => (
              <TableRow key={index}>
                <TableCell className="p-2">{tool.ToolName}</TableCell>
                <TableCell className="p-2">{tool.QuantityAvailable}</TableCell>
                <TableCell className="p-2">{tool.Status}</TableCell>
                <TableCell className="p-2">{tool.Location}</TableCell>
                <TableCell className="p-2">{tool.ToolID}</TableCell>
                <TableCell className="p-2">{tool.LastUpdated}</TableCell>
                <TableCell className="p-2">
                  <button
                    onClick={() => handleRequestClick(tool)}
                    className="text-blue-500 hover:underline"
                  >
                    Request
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedTool !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className=" rounded w-96">
            <RequestCard toolID={selectedTool.ToolID} toolName={selectedTool.ToolName} onClose={handleCloseRequestCard} />
          </div>
        </div>
      )}
    </>
  );
};

export default ToolTable;
