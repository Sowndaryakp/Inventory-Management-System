import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'; // Import pagination components
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Category {
  CategoryID: number;
  CategoryName: string;
  ParentID: number | null;
}

const CategoryTable: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCategories, setTotalCategories] = useState<number>(0); // To track the total number of departments
  const categoriesPerPage = 5; // Number of categories per page
  const [filteredInfo, setFilteredInfo] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, [currentPage]); // Fetch categories when currentPage changes

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://172.18.7.27:8000/api/v1/categories/');
      setCategories(response.data);
      setTotalCategories(response.data.length)
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Handle error if needed
    }
  };

  const handleEdit = (categoryID: number) => {
    // Implement edit functionality
    console.log(`Edit category with ID: ${categoryID}`);
  };

  const handleDelete = (categoryID: number) => {
    // Implement delete functionality
    console.log(`Delete category with ID: ${categoryID}`);
  };

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setFilteredInfo(filters);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      title: 'Category ID',
      dataIndex: 'CategoryID',
      key: 'CategoryID',
    },
    {
      title: 'Category Name',
      dataIndex: 'CategoryName',
      key: 'CategoryName',
      filters: categories.map((cat) => ({ text: cat.CategoryName, value: cat.CategoryName })), // Add filters for department names
      onFilter: (value: any, record: Category) => record.CategoryName.includes(value as string),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Category) => (
        <span>
          <Button onClick={() => handleEdit(record.CategoryID)} className="mr-2 mb-2 w-16">Edit</Button>
          <span style={{ margin: '0 8px' }} /> {/* Add space between buttons */}
          <Button onClick={() => handleDelete(record.CategoryID)} danger className="mr-2 w-16">Delete</Button>
        </span>
      ),
    },
  ];

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <div className="overflow-auto max-w-full">
      <Card className="shadow-md rounded-lg overflow-hidden ml-6">
      <Table
        columns={columns}
        dataSource={currentCategories}
        rowKey="CategoryID"
        pagination={{
          current: currentPage,
          pageSize: categoriesPerPage,
          total: totalCategories,
          onChange: (page) => setCurrentPage(page),
        }}
        onChange={handleChange}
        bordered
        // pagination={false} // Disable built-in pagination
      />

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

export default CategoryTable;
