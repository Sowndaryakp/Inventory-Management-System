import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const CreateTool = ({ onClose, onToolAdded }) => {
    const [toolName, setToolName] = useState('');
    const [quantityAvailable, setQuantityAvailable] = useState(0);
    const [status, setStatus] = useState('Available');
    const [location, setLocation] = useState('');
    const [categoryID, setCategoryID] = useState(1);
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!toolName || quantityAvailable <= 0 || !status || !location || categoryID <= 0) {
            setError('All fields are required');
            return;
        }
        try {
            const response = await axios.post('http://172.18.7.27:8000/tools/', {
                ToolName: toolName,
                QuantityAvailable: quantityAvailable,
                Status: status,
                Location: location,
                CategoryID: categoryID
            });
            console.log('Response:', response.data);
            onToolAdded(); // Notify parent component to refresh the table
            onClose();
        }
        catch (err) {
            console.error('Error submitting request:', err);
            if (err.response && err.response.data) {
                setError(`Error: ${err.response.data.detail}`);
            }
            else {
                setError('An unexpected error occurred');
            }
        }
    };
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Create Tool" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "toolName", className: "block text-sm font-medium text-gray-700", children: "Tool Name" }), _jsx("input", { type: "text", id: "toolName", value: toolName, onChange: (e) => setToolName(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "quantityAvailable", className: "block text-sm font-medium text-gray-700", children: "Quantity Available" }), _jsx("input", { type: "number", id: "quantityAvailable", value: quantityAvailable, onChange: (e) => setQuantityAvailable(parseInt(e.target.value)), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "status", className: "block text-sm font-medium text-gray-700", children: "Status" }), _jsx("input", { type: "text", id: "status", value: status, onChange: (e) => setStatus(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "location", className: "block text-sm font-medium text-gray-700", children: "Location" }), _jsx("input", { type: "text", id: "location", value: location, onChange: (e) => setLocation(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "categoryID", className: "block text-sm font-medium text-gray-700", children: "Category ID" }), _jsx("input", { type: "number", id: "categoryID", value: categoryID, onChange: (e) => setCategoryID(parseInt(e.target.value)), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), error && _jsx("p", { className: "text-red-500", children: error }), _jsxs(CardFooter, { className: "flex justify-between mt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) })] }));
};
export default CreateTool;
