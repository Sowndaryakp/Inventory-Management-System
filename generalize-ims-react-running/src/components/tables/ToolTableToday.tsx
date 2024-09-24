import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RequestCard from '../RequestCard';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [selectedTool, setSelectedTool] = useState<{ toolID: number, toolName: string, quantityAvailable: number } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toolsPerPage = 8;

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

  const columns: ColumnsType<Tool> = [
    {
      title: 'Tool Name',
      dataIndex: 'ToolName',
      filters: Array.from(new Set(tools.map(tool => tool.ToolName))).map(toolName => ({ text: toolName, value: toolName })),
      filterSearch: true, // Add this line to enable search filter
      onFilter: (value, record) => record.ToolName.toLowerCase().includes((value as string).toLowerCase()), // Modify filter function for case-insensitive search
      sorter: (a, b) => a.ToolID - b.ToolID,
    },
    {
      title: 'Quantity Available',
      dataIndex: 'QuantityAvailable',
      sorter: (a, b) => a.QuantityAvailable - b.QuantityAvailable,
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      filters: Array.from(new Set(tools.map(tool => tool.Status))).map(status => ({ text: status, value: status })),
      onFilter: (value, record) => record.Status.includes(value as string),
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      filters: Array.from(new Set(tools.map(tool => tool.Location))).map(location => ({ text: location, value: location })),
      filterSearch: true, 
      onFilter: (value, record) => record.Location.includes(value as string),
    },
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      sorter: (a, b) => a.ToolID - b.ToolID,
    },
    {
      title: 'Last Updated',
      dataIndex: 'LastUpdated',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <CardFooter className="flex justify-end p-0">
          <Button onClick={() => handleRequestClick(record.ToolID, record.ToolName, record.QuantityAvailable)} type="submit">
            Request
          </Button>
        </CardFooter>
      ),
    },
  ];

  const onChange: TableProps<Tool>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className="overflow-auto max-w-full">
      <Card className="shadow-md rounded-lg overflow-hidden">
        <Table
          columns={columns}
          dataSource={currentTools}
          pagination={false}
          onChange={onChange}
          rowKey="ToolID"
        />
      </Card>
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
