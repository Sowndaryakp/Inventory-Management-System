import React, { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
}

const ToolTable: React.FC<ToolTableProps> = ({ tools }) => {
  const [selectedTool, setSelectedTool] = useState<{ toolID: number, toolName: string } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toolsPerPage = 10;

  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool);

  const handleRequestClick = (toolID: number, toolName: string, quantityAvailable: number) => {
    setSelectedTool({ toolID, toolName, quantityAvailable });
  };

  const handleCloseRequestCard = () => {
    setSelectedTool(null);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-auto max-w-full">
      <div className="shadow-md rounded-lg overflow-hidden">
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
            {currentTools.map((tool, index) => (
              <TableRow key={index}>
                <TableCell className="p-2">{tool.ToolName}</TableCell>
                <TableCell className="p-2">{tool.QuantityAvailable}</TableCell>
                <TableCell className="p-2">{tool.Status}</TableCell>
                <TableCell className="p-2">{tool.Location}</TableCell>
                <TableCell className="p-2">{tool.ToolID}</TableCell>
                <TableCell className="p-2">{tool.LastUpdated}</TableCell>
                <TableCell className="p-2">
                <CardFooter className="flex justify-end p-0">
                  <Button onClick={() => handleRequestClick(tool.ToolID, tool.ToolName, tool.QuantityAvailable)} type="submit">Request</Button>
                </CardFooter>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedTool !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="rounded w-96">
            <RequestCard
              toolID={selectedTool.toolID}
              toolName={selectedTool.toolName}
              quantityAvailable={selectedTool.quantityAvailable}
              onClose={handleCloseRequestCard}
            />
          </div>
        </div>
      )}

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(Math.ceil(tools.length / toolsPerPage)).keys()].map((number) => (
            <PaginationItem key={number}>
              <PaginationLink href="#" onClick={() => paginate(number + 1)} isActive={currentPage === number + 1}>
                {number + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(tools.length / toolsPerPage)))}
              disabled={currentPage === Math.ceil(tools.length / toolsPerPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ToolTable;
