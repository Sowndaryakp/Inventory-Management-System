import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Table } from 'antd';
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const HomeTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const personsPerPage = 2;
    const data = [
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
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const columns = [
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
            onFilter: (value, record) => record.occupation.includes(value),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (_jsx(CardFooter, { className: "flex justify-end p-0", children: _jsx(Button, { onClick: () => handleAction(record.id), children: "Action" }) })),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const handleAction = (id) => {
        // Handle action here
        console.log(`Action clicked for person with ID: ${id}`);
    };
    return (_jsx("div", { className: "overflow-auto max-w-full", children: _jsx("div", { className: "shadow-md rounded-lg overflow-hidden", children: _jsx(Table, { columns: columns, dataSource: currentPersons, 
                // pagination={false}
                bordered: true, onChange: onChange, rowKey: "id" }) }) }));
};
export default HomeTable;
