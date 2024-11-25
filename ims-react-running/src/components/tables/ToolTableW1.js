import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RequestCard from '../RequestCard'; // Import RequestCard component
const ToolTable = ({ tools }) => {
    const [selectedTool, setSelectedTool] = useState(null);
    const handleRequestClick = (tool) => {
        setSelectedTool(tool);
    };
    const handleCloseRequestCard = () => {
        setSelectedTool(null);
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "overflow-auto max-w-full", children: _jsxs(Table, { className: "min-w-full sm:min-w-[600px]", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-1/6 p-2", children: "ToolName" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "QuantityAvailable" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Status" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Location" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "ToolID" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "LastUpdated" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Action" })] }) }), _jsx(TableBody, { children: tools.map((tool, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "p-2", children: tool.ToolName }), _jsx(TableCell, { className: "p-2", children: tool.QuantityAvailable }), _jsx(TableCell, { className: "p-2", children: tool.Status }), _jsx(TableCell, { className: "p-2", children: tool.Location }), _jsx(TableCell, { className: "p-2", children: tool.ToolID }), _jsx(TableCell, { className: "p-2", children: tool.LastUpdated }), _jsx(TableCell, { className: "p-2", children: _jsx("button", { onClick: () => handleRequestClick(tool), className: "text-blue-500 hover:underline", children: "Request" }) })] }, index))) })] }) }), selectedTool !== null && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50", children: _jsx("div", { className: " rounded w-96", children: _jsx(RequestCard, { toolID: selectedTool.ToolID, toolName: selectedTool.ToolName, onClose: handleCloseRequestCard }) }) }))] }));
};
export default ToolTable;
