import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
const CreateTools = () => {
    const [toolData, setToolData] = useState({
        ToolName: '',
        QuantityAvailable: 0,
        Status: 'Available',
        Location: '',
    });
    const [response, setResponse] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setToolData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://172.18.7.27:8000/tools/', toolData);
            setResponse(response.data);
        }
        catch (error) {
            console.error('Error creating tool:', error);
        }
    };
    return (_jsxs("div", { className: "max-w-xl mx-auto mt-8", children: [_jsxs("div", { className: "bg-white shadow-md rounded-lg p-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-4", children: "Create New Tool" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "ToolName", className: "block text-sm font-medium text-gray-700", children: "Tool Name" }), _jsx("input", { type: "text", id: "ToolName", name: "ToolName", value: toolData.ToolName, onChange: handleChange, className: "mt-1 p-2 border rounded-md w-full", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "QuantityAvailable", className: "block text-sm font-medium text-gray-700", children: "Quantity Available" }), _jsx("input", { type: "number", id: "QuantityAvailable", name: "QuantityAvailable", value: toolData.QuantityAvailable, onChange: handleChange, className: "mt-1 p-2 border rounded-md w-full", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "Location", className: "block text-sm font-medium text-gray-700", children: "Location" }), _jsx("input", { type: "text", id: "Location", name: "Location", value: toolData.Location, onChange: handleChange, className: "mt-1 p-2 border rounded-md w-full", required: true })] }), _jsx("button", { type: "submit", className: "bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600", children: "Create Tool" })] })] }), response && (_jsxs("div", { className: "mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded", children: [_jsx("strong", { children: "Success:" }), " Tool created successfully! Tool ID: ", response.ToolID] }))] }));
};
export default CreateTools;
