import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Person {
  id: number;
  name: string;
  age: number;
  occupation: string;
}

const HomeTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const personsPerPage = 2;

  const data: Person[] = [
    { id: 1, name: 'John Doe', age: 28, occupation: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', age: 34, occupation: 'Graphic Designer' },
    { id: 3, name: 'Mike Johnson', age: 45, occupation: 'Product Manager' },
    { id: 4, name: 'Emily Davis', age: 23, occupation: 'Data Scientist' },
    { id: 5, name: 'Jack Wilson', age: 30, occupation: 'Sales Manager' },
    { id: 6, name: 'Emma Brown', age: 29, occupation: 'Marketing Specialist' },
    { id: 7, name: 'Daniel Lee', age: 32, occupation: 'Financial Analyst' },
  ];

  const totalPersons = data.length;
  const totalPages = Math.ceil(totalPersons / personsPerPage);

  const indexOfLastPerson = currentPage * personsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
  const currentPersons = data.slice(indexOfFirstPerson, indexOfLastPerson);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns: ColumnsType<Person> = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Occupation',
      dataIndex: 'occupation',
      filters: Array.from(new Set(data.map(person => person.occupation))).map(occupation => ({ text: occupation, value: occupation })),
      onFilter: (value, record) => record.occupation.includes(value as string),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <CardFooter className="flex justify-end p-0">
          <Button onClick={() => handleAction(record.id)}>Action</Button>
        </CardFooter>
      ),
    },
  ];

  const onChange: TableProps<Person>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleAction = (id: number) => {
    // Handle action here
    console.log(`Action clicked for person with ID: ${id}`);
  };

  return (
    <div className="overflow-auto max-w-full">
      <div className="shadow-md rounded-lg overflow-hidden">
        <Table
          columns={columns}
          dataSource={currentPersons}
          // pagination={false}
          bordered
          onChange={onChange}
          rowKey="id"
        />
      </div>

      {/* Pagination */}
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

export default HomeTable;
