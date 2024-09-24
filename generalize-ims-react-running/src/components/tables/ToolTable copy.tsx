import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiWarning, CiCircleCheck } from "react-icons/ci";
import RequestCard from '../RequestCard';

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
  onRequestClick: (toolID: number) => void;
}

const ToolTable: React.FC<ToolTableProps> = ({ tools, onRequestClick }) => {
  const getStatusIcon = (status: string) => {
    if (status === "In Use") {
      return <CiWarning className="inline-block" />;
    } else if (status === "Available") {
      return <CiCircleCheck className="inline-block" />;
    }
    return null;
  };

  return (
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
            <TableCell className="p-2">
              {getStatusIcon(tool.Status)} {tool.Status}
            </TableCell>
            <TableCell className="p-2">{tool.Location}</TableCell>
            <TableCell className="p-2">{tool.ToolID}</TableCell>
            <TableCell className="p-2">{tool.LastUpdated}</TableCell>
            <TableCell className="p-2">
              <button
                onClick={() => onRequestClick(tool.ToolID)}
                className="text-blue-500 hover:underline"
              >
                Request
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ToolTable;
