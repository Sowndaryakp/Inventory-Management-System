import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateTool from '../forms/CreateTool';
import ToolTable from '../tables/ToolTable'; // Import the ToolTable component
const ToolCard = () => {
    const [showForm, setShowForm] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false); // State to trigger table refresh
    const handleAddTool = () => {
        setShowForm(true);
    };
    const handleCloseForm = () => {
        setShowForm(false);
    };
    const handleToolAdded = () => {
        setRefreshTable(true); // Trigger table refresh
    };
    const handleTableRefreshed = () => {
        setRefreshTable(false); // Reset table refresh state
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-full", children: [_jsx(Button, { onClick: handleAddTool, className: "mt-4", children: "Add Tool" }), showForm && (_jsxs("div", { className: "fixed inset-0 flex items-center justify-center z-10", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-50", onClick: handleCloseForm }), _jsx("div", { className: "relative z-10 bg-white p-4 rounded-lg", children: _jsx(CreateTool, { onClose: handleCloseForm, onToolAdded: handleToolAdded }) })] })), _jsx("div", { className: "mt-4 overflow-x-auto", children: _jsx(ToolTable, { refreshTable: refreshTable, onTableRefreshed: handleTableRefreshed }) })] }));
};
export default ToolCard;
