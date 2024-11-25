import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const CreateToolRequest = ({ onClose }) => {
    const [toolID, setToolID] = useState(0);
    const [batchNumber, setBatchNumber] = useState('');
    const [manufactureDate, setManufactureDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [error, setError] = useState('');
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetchTools();
    }, []);
    const fetchTools = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/tools');
            setTools(response.data);
        }
        catch (error) {
            console.error('Error fetching tools:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!toolID || !batchNumber || !manufactureDate || !expiryDate) {
            setError('All fields are required');
            return;
        }
        try {
            const response = await axios.post('http://172.18.7.27:8000/api/', {
                ToolID: toolID,
                BatchNumber: batchNumber,
                ManufactureDate: manufactureDate,
                ExpiryDate: expiryDate,
            });
            console.log('Response:', response.data);
            onClose();
        }
        catch (err) {
            console.error('Error submitting request:', err);
            setError('Error submitting request');
        }
    };
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Create New Tool Request" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "toolID", className: "block text-sm font-medium text-gray-700", children: "Tool ID" }), _jsxs("select", { id: "toolID", value: toolID, onChange: (e) => setToolID(parseInt(e.target.value)), className: "mt-1 p-2 border border-gray-300 rounded-md w-full", children: [_jsx("option", { value: "", children: "Select a Tool" }), tools.map((tool) => (_jsxs("option", { value: tool.ToolID, children: [tool.ToolID, " - ", tool.ToolName] }, tool.ToolID)))] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "batchNumber", className: "block text-sm font-medium text-gray-700", children: "Batch Number" }), _jsx("input", { type: "text", id: "batchNumber", value: batchNumber, onChange: (e) => setBatchNumber(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "manufactureDate", className: "block text-sm font-medium text-gray-700", children: "Manufacture Date" }), _jsx("input", { type: "datetime-local", id: "manufactureDate", value: manufactureDate, onChange: (e) => setManufactureDate(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "expiryDate", className: "block text-sm font-medium text-gray-700", children: "Expiry Date" }), _jsx("input", { type: "datetime-local", id: "expiryDate", value: expiryDate, onChange: (e) => setExpiryDate(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), error && _jsx("p", { className: "text-red-500", children: error }), _jsxs(CardFooter, { className: "flex justify-between mt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) })] }));
};
export default CreateToolRequest;
