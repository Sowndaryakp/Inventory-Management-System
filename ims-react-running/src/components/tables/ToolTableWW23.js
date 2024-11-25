import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RequestCard from '../RequestCard';
const ToolTable = ({ tools }) => {
    const [selectedTool, setSelectedTool] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const toolsPerPage = 10;
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
    return (_jsxs("div", { className: "overflow-auto max-w-full", children: [_jsx("div", { className: "shadow-md rounded-lg overflow-hidden", children: _jsxs(Table, { className: "min-w-full sm:min-w-[600px]", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-1/6 p-2", children: "ToolName" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "QuantityAvailable" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Status" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Location" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "ToolID" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "LastUpdated" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Action" })] }) }), _jsx(TableBody, { children: currentTools.map((tool, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "p-2", children: tool.ToolName }), _jsx(TableCell, { className: "p-2", children: tool.QuantityAvailable }), _jsx(TableCell, { className: "p-2", children: tool.Status }), _jsx(TableCell, { className: "p-2", children: tool.Location }), _jsx(TableCell, { className: "p-2", children: tool.ToolID }), _jsx(TableCell, { className: "p-2", children: tool.LastUpdated }), _jsx(TableCell, { className: "p-2", children: _jsx(CardFooter, { className: "flex justify-end p-0", children: _jsx(Button, { onClick: () => handleRequestClick(tool.ToolID, tool.ToolName, tool.QuantityAvailable), type: "submit", children: "Request" }) }) })] }, index))) })] }) }), selectedTool !== null && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50", children: _jsx("div", { className: "rounded w-96", children: _jsx(RequestCard, { toolID: selectedTool.toolID, toolName: selectedTool.toolName, quantityAvailable: selectedTool.quantityAvailable, onClose: handleCloseRequestCard }) }) })), _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#", onClick: () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)), disabled: currentPage === 1 }) }), [...Array(Math.ceil(tools.length / toolsPerPage)).keys()].map((number) => (_jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", onClick: () => paginate(number + 1), isActive: currentPage === number + 1, children: number + 1 }) }, number))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#", onClick: () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(tools.length / toolsPerPage))), disabled: currentPage === Math.ceil(tools.length / toolsPerPage) }) })] }) })] }));
};
export default ToolTable;
