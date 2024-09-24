import React, { useState } from 'react';
import { Table, Pagination } from 'antd';
import type { ColumnsType, TableProps } from 'antd';
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RequestCard from '../RequestCard';
import { Card } from "@/components/ui/card";

interface Tool {
  ToolName: string;
  QuantityAvailable: number;
  Status: string;
  Location: string;
  ToolID: number;
  LastUpdated: string;
}

interface ToolTableProps {
  tools: Tool[];
}

const ToolTable: React.FC<ToolTableProps> = ({ tools }) => {
  const [selectedTool, setSelectedTool] = useState<{ toolID: number, toolName: string, quantityAvailable: number } | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toolsPerPage = 7;
  const totalTools = tools.length;

  // Calculate pagination info
  const startIndex = (currentPage - 1) * toolsPerPage;
  const endIndex = startIndex + toolsPerPage;
  const currentTools = tools.slice(startIndex, endIndex);

  const handleRequestClick = (toolID: number, toolName: string, quantityAvailable: number) => {
    setSelectedTool({ toolID, toolName, quantityAvailable });
  };

  const handleCloseRequestCard = () => {
    setSelectedTool(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns: ColumnsType<Tool> = [
    {
      title: 'Tool Name',
      dataIndex: 'ToolName',
      filters: Array.from(new Set(tools.map(tool => tool.ToolName))).map(toolName => ({ text: toolName, value: toolName })),
      filterSearch: true,
      onFilter: (value, record) => record.ToolName.toLowerCase().includes((value as string).toLowerCase()),
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
      render: date => new Date(date).toLocaleString(),
      sorter: (a, b) => new Date(a.LastUpdated).getTime() - new Date(b.LastUpdated).getTime(),
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

  return (
    <div className="overflow-x-auto">
      <Card className="shadow-md rounded-lg overflow-hidden">
        <Table
          columns={columns}
          dataSource={currentTools}
          pagination={false}
          bordered
          rowKey="ToolID"
        />
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            pageSize={toolsPerPage}
            total={totalTools}
            onChange={handlePageChange}
            showSizeChanger={false} // Hide page size changer if not needed
          />
        </div>
      </Card>

      {selectedTool !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="flex flex-col items-center justify-center h-full">
            <RequestCard
              toolID={selectedTool.toolID}
              toolName={selectedTool.toolName}
              quantityAvailable={selectedTool.quantityAvailable}
              onClose={handleCloseRequestCard}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolTable;
