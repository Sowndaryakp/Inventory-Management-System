import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateDepartment from '../forms/CreateDepartment';
import DepartmentTable from '../tables/DepartmentTable'; // Import the DepartmentTable component
const DepartmentCard = () => {
    const [showForm, setShowForm] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false); // State to trigger table refresh
    const handleAddDepartment = () => {
        setShowForm(true);
    };
    const handleCloseForm = () => {
        setShowForm(false);
    };
    const handleDepartmentAdded = () => {
        // Set refreshTable to true to trigger table refresh
        setRefreshTable(true);
    };
    // Function to reset refreshTable state after table refresh
    const handleTableRefreshed = () => {
        setRefreshTable(false);
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-full", children: [_jsx(Button, { onClick: handleAddDepartment, className: "mt-4", children: "Add Department" }), showForm && (_jsxs("div", { className: "fixed inset-0 flex items-center justify-center z-10", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-50", onClick: handleCloseForm }), _jsx("div", { className: "relative z-10 bg-white p-4 rounded-lg", children: _jsx(CreateDepartment, { onClose: handleCloseForm, onDepartmentAdded: handleDepartmentAdded }) })] })), _jsx("div", { className: "mt-4", children: _jsx(DepartmentTable, { refreshTable: refreshTable, onTableRefreshed: handleTableRefreshed }) })] }));
};
export default DepartmentCard;
