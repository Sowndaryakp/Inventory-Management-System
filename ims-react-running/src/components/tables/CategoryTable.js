import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
const CategoryTable = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCategories, setTotalCategories] = useState(0); // To track the total number of departments
    const categoriesPerPage = 5; // Number of categories per page
    const [filteredInfo, setFilteredInfo] = useState(null);
    useEffect(() => {
        fetchCategories();
    }, [currentPage]); // Fetch categories when currentPage changes
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/api/v1/categories/');
            setCategories(response.data);
            setTotalCategories(response.data.length);
        }
        catch (error) {
            console.error('Error fetching categories:', error);
            // Handle error if needed
        }
    };
    const handleEdit = (categoryID) => {
        // Implement edit functionality
        console.log(`Edit category with ID: ${categoryID}`);
    };
    const handleDelete = (categoryID) => {
        // Implement delete functionality
        console.log(`Delete category with ID: ${categoryID}`);
    };
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };
    const paginate = (pageNumber) => {
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
            filters: categories.map((cat) => ({ text: cat.CategoryName, value: cat.CategoryName })),
            onFilter: (value, record) => record.CategoryName.includes(value),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (_jsxs("span", { children: [_jsx(Button, { onClick: () => handleEdit(record.CategoryID), className: "mr-2 mb-2 w-16", children: "Edit" }), _jsx("span", { style: { margin: '0 8px' } }), " ", _jsx(Button, { onClick: () => handleDelete(record.CategoryID), danger: true, className: "mr-2 w-16", children: "Delete" })] })),
        },
    ];
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
    const totalPages = Math.ceil(categories.length / categoriesPerPage);
    return (_jsx("div", { className: "overflow-auto max-w-full", children: _jsx(Card, { className: "shadow-md rounded-lg overflow-hidden ml-6", children: _jsx(Table, { columns: columns, dataSource: currentCategories, rowKey: "CategoryID", pagination: {
                    current: currentPage,
                    pageSize: categoriesPerPage,
                    total: totalCategories,
                    onChange: (page) => setCurrentPage(page),
                }, onChange: handleChange, bordered: true }) }) }));
};
export default CategoryTable;
