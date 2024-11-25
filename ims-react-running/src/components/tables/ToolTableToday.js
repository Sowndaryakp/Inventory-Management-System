import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Table } from 'antd';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RequestCard from '../RequestCard';
import { Card } from "@/components/ui/card";
const ToolTable = ({ tools }) => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const toolsPerPage = 8;
    const indexOfLastTool = currentPage * toolsPerPage;
    const indexOfFirstTool = indexOfLastTool - toolsPerPage;
    const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool);
    const handleRequestClick = (toolID, toolName, quantityAvailable) => {
        setSelectedTool({ toolID, toolName, quantityAvailable });
    };
    const handleCloseRequestCard = () => {
        setSelectedTool(null);
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (_jsx(CardFooter, { className: "flex justify-end p-0", children: _jsx(Button, { onClick: () => handleRequestClick(record.ToolID, record.ToolName, record.QuantityAvailable), type: "submit", children: "Request" }) })),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (_jsxs("div", { className: "overflow-auto max-w-full", children: [_jsx(Card, { className: "shadow-md rounded-lg overflow-hidden", children: _jsx(Table, { columns: columns, dataSource: currentTools, pagination: false, onChange: onChange, rowKey: "ToolID" }) }), selectedTool !== null && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50", children: _jsx("div", { className: "rounded w-96", children: _jsx(RequestCard, { toolID: selectedTool.toolID, toolName: selectedTool.toolName, quantityAvailable: selectedTool.quantityAvailable, onClose: handleCloseRequestCard }) }) })), _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#", onClick: () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)), disabled: currentPage === 1 }) }), [...Array(Math.ceil(tools.length / toolsPerPage)).keys()].map((number) => (_jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", onClick: () => paginate(number + 1), isActive: currentPage === number + 1, children: number + 1 }) }, number))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#", onClick: () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(tools.length / toolsPerPage))), disabled: currentPage === Math.ceil(tools.length / toolsPerPage) }) })] }) })] }));
};
export default ToolTable;
