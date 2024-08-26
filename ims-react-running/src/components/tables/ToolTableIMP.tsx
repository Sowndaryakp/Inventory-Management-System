import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RequestCard from '../RequestCard';
import axios from 'axios';

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
  const [selectedTool, setSelectedTool] = useState<{ toolID: number, toolName: string } | null>(null);
  const [requestData, setRequestData] = useState<any>(null);

  const handleRequestClick = async (toolID: number, toolName: string) => {
    try {
      console.log(`Fetching request data for ToolID: ${toolID}`);
      const response = await axios.get(`http://172.18.7.27:8000/tool_requests/${toolID}`);
      console.log('Request data:', response.data);
      setRequestData(response.data);
      setSelectedTool({ toolID, toolName });
    } catch (error) {
      console.error('Error fetching request data:', error);
    }
  };

  const handleCloseRequestCard = () => {
    setSelectedTool(null);
    setRequestData(null);
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
                    onClick={() => handleRequestClick(tool.ToolID, tool.ToolName)}
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
      {selectedTool !== null && requestData !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="rounded w-96">
            <RequestCard
              toolID={selectedTool.toolID}
              toolName={selectedTool.toolName}
              requestData={requestData}
              onClose={handleCloseRequestCard}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ToolTable;
