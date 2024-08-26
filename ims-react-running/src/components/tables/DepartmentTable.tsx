import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'; // Import pagination components
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Department {
  DepID: number;
  Name: string;
}

const DepartmentTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalDepartments, setTotalDepartments] = useState<number>(0); // To track the total number of departments
  const departmentsPerPage = 5; // Number of departments per page
  const [filteredInfo, setFilteredInfo] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, [currentPage]); // Fetch departments when currentPage changes

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://172.18.7.27:8000/departments/');
       setDepartments(response.data);
      setTotalDepartments(response.data.length); // Set total number of departments
    } catch (error) {
      console.error('Error fetching departments:', error);
      // Handle error if needed
    }
  };

  const handleEdit = (depID: number) => {
    // Implement edit functionality
    console.log(`Edit department with ID: ${depID}`);
  };

  const handleDelete = async (depID: number) => {
    try {
      // Implement delete functionality
      await axios.delete(`http://172.18.7.27:8000/departments/${depID}`);
      // Fetch departments after successful deletion
      fetchDepartments();
    } catch (error) {
      console.error(`Error deleting department with ID ${depID}:`, error);
      // Handle error if needed
    }
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      title: 'Department ID',
      dataIndex: 'DepID',
      key: 'DepID',
    },
    {
      title: 'Department Name',
      dataIndex: 'Name',
      key: 'Name',
      filters: departments.map((dept) => ({ text: dept.Name, value: dept.Name })), // Add filters for department names
      onFilter: (value: any, record: Department) => record.Name.includes(value as string),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Department) => (
        <span>
          <Button onClick={() => handleEdit(record.DepID)} className="mr-2 mb-2 w-16">Edit</Button>
          <span style={{ margin: '0 8px' }} /> {/* Add space between buttons */}
          <Button onClick={() => handleDelete(record.DepID)} className="mr-2 w-16" danger>Delete</Button>
        </span>
      ),
    },
  ];

  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);
  const totalPages = Math.ceil(departments.length / departmentsPerPage);

  return (
    <div className="overflow-auto max-w-full">
      <Card className="shadow-md rounded-lg overflow-hidden ml-5">
      <Table
          columns={columns}
          dataSource={departments}
          rowKey="DepID"
          pagination={{
            current: currentPage,
            pageSize: departmentsPerPage,
            total: totalDepartments,
            onChange: (page) => setCurrentPage(page),
          }}
          onChange={handleChange}
          bordered
        />
      {/* <Table
        columns={columns}
        dataSource={currentDepartments}
        rowKey="DepID"
        bordered
        // pagination={false} // Disable built-in pagination
      /> */}

      {/* Pagination */}
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

export default DepartmentTable;
