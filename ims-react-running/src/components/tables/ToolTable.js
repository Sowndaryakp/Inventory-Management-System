import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";
const ToolTable = ({ refreshTable, onTableRefreshed }) => {
    const [tools, setTools] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalTools, setTotalTools] = useState(0);
    const toolsPerPage = 5;
    const [filteredInfo, setFilteredInfo] = useState(null);
    useEffect(() => {
        fetchTools();
    }, [currentPage, refreshTable]);
    const fetchTools = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/tools');
            setTools(response.data);
            setTotalTools(response.data.length);
            if (refreshTable) {
                onTableRefreshed();
            }
        }
        catch (error) {
            console.error('Error fetching tools:', error);
        }
    };
    const handleEdit = (toolID) => {
        console.log(`Edit tool with ID: ${toolID}`);
    };
    const handleDelete = (toolID) => {
        console.log(`Delete tool with ID: ${toolID}`);
    };
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
    };
    const paginate = (pageNumber) => {
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
            filters: tools.map((tool) => ({ text: tool.ToolName, value: tool.ToolName })),
            onFilter: (value, record) => record.ToolName.includes(value),
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
            render: (text, record) => (_jsxs("span", { children: [_jsx(Button, { onClick: () => handleEdit(record.ToolID), className: "mr-2 mb-2 w-16", children: "Edit" }), _jsx("span", { style: { margin: '0 8px' } }), _jsx(Button, { onClick: () => handleDelete(record.ToolID), className: "mr-2 w-16", danger: true, children: "Delete" })] })),
        },
    ];
    const indexOfLastTool = currentPage * toolsPerPage;
    const indexOfFirstTool = indexOfLastTool - toolsPerPage;
    const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool);
    const totalPages = Math.ceil(tools.length / toolsPerPage);
    return (_jsx("div", { className: "overflow-auto max-w-full", children: _jsxs(Card, { className: "shadow-md rounded-lg overflow-hidden", children: [_jsx("h2", { className: "text-2xl text-center font-bold mt-5", children: "Total Tools Data " }), _jsx(Table, { columns: columns, dataSource: currentTools, rowKey: "ToolID", pagination: {
                        current: currentPage,
                        pageSize: toolsPerPage,
                        total: totalTools,
                        onChange: (page) => setCurrentPage(page),
                    }, onChange: handleChange, bordered: true })] }) }));
};
export default ToolTable;
