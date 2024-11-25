import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CreateToolRequest from '../forms/CreateToolRequest';
const CategoryDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const handleAddCategory = () => {
        setShowForm(true);
    };
    const handleCloseForm = () => {
        setShowForm(false);
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-full", children: [_jsx(Button, { onClick: handleAddCategory, className: "mt-4", children: "Add New Tool Request" }), showForm && (_jsxs("div", { className: "fixed inset-0 flex items-center justify-center z-10", children: [_jsx("div", { className: "absolute inset-0 bg-black opacity-50", onClick: handleCloseForm }), _jsx("div", { className: "relative z-10 bg-white p-4 rounded-lg", children: _jsx(CreateToolRequest, { onClose: handleCloseForm }) })] }))] }));
};
export default CategoryDashboard;
