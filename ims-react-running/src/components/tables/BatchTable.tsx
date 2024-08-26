import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Tool {
  ToolID: number;
  BatchNumber: string;
  ManufactureDate: string;
  ExpiryDate: string;
  BatchID: number;
}

interface ToolTableProps {
  refreshTable: boolean;
  onTableRefreshed: () => void;
}

const ToolTable: React.FC<ToolTableProps> = ({ refreshTable, onTableRefreshed }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const toolsPerPage = 7;

  useEffect(() => {
    fetchTools();
  }, [currentPage, refreshTable]);

  const fetchTools = async () => {
    try {
      const response = await axios.get(`http://172.18.7.27:8000/api/?skip=${(currentPage - 1) * toolsPerPage}&limit=${toolsPerPage}`);
      setTools(response.data);
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

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
      sorter: (a: Tool, b: Tool) => a.ToolID - b.ToolID,
    },
    {
      title: 'Batch Number',
      dataIndex: 'BatchNumber',
      key: 'BatchNumber',
      filters: Array.from(new Set(tools.map(tool => tool.BatchNumber))).map(batchNumber => ({ text: batchNumber, value: batchNumber })),
      onFilter: (value, record) => record.BatchNumber.includes(value as string),
    },
    {
      title: 'Manufacture Date',
      dataIndex: 'ManufactureDate',
      key: 'ManufactureDate',
      sorter: (a: Tool, b: Tool) => new Date(a.ManufactureDate).getTime() - new Date(b.ManufactureDate).getTime(),
    },
    {
      title: 'Expiry Date',
      dataIndex: 'ExpiryDate',
      key: 'ExpiryDate',
      sorter: (a: Tool, b: Tool) => new Date(a.ExpiryDate).getTime() - new Date(b.ExpiryDate).getTime(),
    },
    {
      title: 'Batch ID',
      dataIndex: 'BatchID',
      key: 'BatchID',
      sorter: (a: Tool, b: Tool) => a.BatchID - b.BatchID,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Tool) => (
        <span>
          <div className="overflow-x-auto">
          <Button onClick={() => handleEdit(record.ToolID)} className="mr-2 mb-2 w-16">Edit</Button>
          {/* <span style={{ margin: '0 8px' }} /> */}
          <Button onClick={() => handleDelete(record.ToolID)} className="mr-2 w-16" >Delete</Button>
        </div>
        </span>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const totalPages = Math.ceil(tools.length / toolsPerPage);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tools}
        rowKey="ToolID"
        // pagination={false}
        onChange={onChange}
        bordered
      />

      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages).keys()].map((number) => (
            <PaginationItem key={number + 1}>
              <PaginationLink href="#" onClick={() => paginate(number + 1)} isActive={currentPage === number + 1}>
                {number + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}
    </div>
  );
};

export default ToolTable;
