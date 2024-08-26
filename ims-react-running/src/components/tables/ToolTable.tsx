import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Tool {
  ToolID: number;
  ToolName: string;
  QuantityAvailable: number;
  Status: string;
  Location: string;
  CategoryID: number;
  EPC: string;
  LastUpdated: string;
}

interface ToolTableProps {
  refreshTable: boolean;
  onTableRefreshed: () => void;
}

const ToolTable: React.FC<ToolTableProps> = ({ refreshTable, onTableRefreshed }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalTools, setTotalTools] = useState<number>(0);
  const toolsPerPage = 5;
  const [filteredInfo, setFilteredInfo] = useState(null);

  useEffect(() => {
    fetchTools();
  }, [currentPage, refreshTable]);

  const fetchTools = async () => {
    try {
      const response = await axios.get('http://172.18.7.27:8000/tools');
      setTools(response.data);
      setTotalTools(response.data.length)
      if (refreshTable) {
        onTableRefreshed();
      }
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const handleEdit = (toolID: number) => {
    console.log(`Edit tool with ID: ${toolID}`);
  };

  const handleDelete = (toolID: number) => {
    console.log(`Delete tool with ID: ${toolID}`);
  };
  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
    },
    {
      title: 'Tool Name',
      dataIndex: 'ToolName',
      key: 'ToolName',
      filters: tools.map((tool) => ({ text: tool.ToolName, value: tool.ToolName })), // Add filters for department names
      onFilter: (value: any, record: Tool) => record.ToolName.includes(value as string),
    },
    {
      title: 'Quantity Available',
      dataIndex: 'QuantityAvailable',
      key: 'QuantityAvailable',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: 'Location',
      dataIndex: 'Location',
      key: 'Location',
    },
    {
      title: 'Category ID',
      dataIndex: 'CategoryID',
      key: 'CategoryID',
    },
    {
      title: 'EPC',
      dataIndex: 'EPC',
      key: 'EPC',
    },
    {
      title: 'Last Updated',
      dataIndex: 'LastUpdated',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Tool) => (
        <span >
          <Button onClick={() => handleEdit(record.ToolID)} className="mr-2 mb-2 w-16">Edit</Button>
          <span style={{ margin: '0 8px' }} />
          <Button onClick={() => handleDelete(record.ToolID)} className="mr-2 w-16" danger>Delete</Button>
        </span>
      ),
    },
  ];

  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil(tools.length / toolsPerPage);

  return (
    <div className="overflow-auto max-w-full">
      <Card className="shadow-md rounded-lg overflow-hidden">
      <h2  className="text-2xl text-center font-bold mt-5">Total Tools Data </h2>
        <Table
          columns={columns}
          dataSource={currentTools}
          rowKey="ToolID"
          pagination={{
            current: currentPage,
            pageSize: toolsPerPage,
            total: totalTools,
            onChange: (page) => setCurrentPage(page),
          }}
          onChange={handleChange}
          bordered
        />
        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(currentPage - 1);
                }}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map((number) => (
              <PaginationItem key={number + 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number + 1);
                  }}
                  isActive={currentPage === number + 1}
                >
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  paginate(currentPage + 1);
                }}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </Card>
    </div>
  );
};

export default ToolTable;
