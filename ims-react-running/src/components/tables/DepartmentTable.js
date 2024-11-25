import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
const DepartmentTable = () => {
    const [departments, setDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDepartments, setTotalDepartments] = useState(0); // To track the total number of departments
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
        }
        catch (error) {
            console.error('Error fetching departments:', error);
            // Handle error if needed
        }
    };
    const handleEdit = (depID) => {
        // Implement edit functionality
        console.log(`Edit department with ID: ${depID}`);
    };
    const handleDelete = async (depID) => {
        try {
            // Implement delete functionality
            await axios.delete(`http://172.18.7.27:8000/departments/${depID}`);
            // Fetch departments after successful deletion
            fetchDepartments();
        }
        catch (error) {
            console.error(`Error deleting department with ID ${depID}:`, error);
            // Handle error if needed
        }
    };
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };
    const paginate = (pageNumber) => {
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
            filters: departments.map((dept) => ({ text: dept.Name, value: dept.Name })),
            onFilter: (value, record) => record.Name.includes(value),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (_jsxs("span", { children: [_jsx(Button, { onClick: () => handleEdit(record.DepID), className: "mr-2 mb-2 w-16", children: "Edit" }), _jsx("span", { style: { margin: '0 8px' } }), " ", _jsx(Button, { onClick: () => handleDelete(record.DepID), className: "mr-2 w-16", danger: true, children: "Delete" })] })),
        },
    ];
    const indexOfLastDepartment = currentPage * departmentsPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
    const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);
    const totalPages = Math.ceil(departments.length / departmentsPerPage);
    return (_jsx("div", { className: "overflow-auto max-w-full", children: _jsx(Card, { className: "shadow-md rounded-lg overflow-hidden ml-5", children: _jsx(Table, { columns: columns, dataSource: departments, rowKey: "DepID", pagination: {
                    current: currentPage,
                    pageSize: departmentsPerPage,
                    total: totalDepartments,
                    onChange: (page) => setCurrentPage(page),
                }, onChange: handleChange, bordered: true }) }) }));
};
export default DepartmentTable;
