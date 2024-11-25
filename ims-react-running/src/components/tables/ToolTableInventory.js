import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Table, Pagination } from 'antd';
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RequestCard from '../RequestCard';
import { Card } from "@/components/ui/card";
const ToolTable = ({ tools }) => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const toolsPerPage = 7;
    const totalTools = tools.length;
    // Calculate pagination info
    const startIndex = (currentPage - 1) * toolsPerPage;
    const endIndex = startIndex + toolsPerPage;
    const currentTools = tools.slice(startIndex, endIndex);
    const handleRequestClick = (toolID, toolName, quantityAvailable) => {
        setSelectedTool({ toolID, toolName, quantityAvailable });
    };
    const handleCloseRequestCard = () => {
        setSelectedTool(null);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const columns = [
        {
            title: 'Tool Name',
            dataIndex: 'ToolName',
            filters: Array.from(new Set(tools.map(tool => tool.ToolName))).map(toolName => ({ text: toolName, value: toolName })),
            filterSearch: true,
            onFilter: (value, record) => record.ToolName.toLowerCase().includes(value.toLowerCase()),
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
            onFilter: (value, record) => record.Status.includes(value),
        },
        {
            title: 'Location',
            dataIndex: 'Location',
            filters: Array.from(new Set(tools.map(tool => tool.Location))).map(location => ({ text: location, value: location })),
            filterSearch: true,
            onFilter: (value, record) => record.Location.includes(value),
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
            render: (_, record) => (_jsx(CardFooter, { className: "flex justify-end p-0", children: _jsx(Button, { onClick: () => handleRequestClick(record.ToolID, record.ToolName, record.QuantityAvailable), type: "submit", children: "Request" }) })),
        },
    ];
    return (_jsxs("div", { className: "overflow-x-auto", children: [_jsxs(Card, { className: "shadow-md rounded-lg overflow-hidden", children: [_jsx(Table, { columns: columns, dataSource: currentTools, pagination: false, bordered: true, rowKey: "ToolID" }), _jsx("div", { className: "flex justify-end mt-4", children: _jsx(Pagination, { current: currentPage, pageSize: toolsPerPage, total: totalTools, onChange: handlePageChange, showSizeChanger: false }) })] }), selectedTool !== null && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50", children: _jsx("div", { className: "flex flex-col items-center justify-center h-full", children: _jsx(RequestCard, { toolID: selectedTool.toolID, toolName: selectedTool.toolName, quantityAvailable: selectedTool.quantityAvailable, onClose: handleCloseRequestCard }) }) }))] }));
};
export default ToolTable;
