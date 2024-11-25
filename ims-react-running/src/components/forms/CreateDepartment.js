import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const CreateDepartment = ({ onClose }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            setError('Name is required');
            return;
        }
        try {
            const response = await axios.post('http://172.18.7.27:8000/departments/', { Name: name });
            console.log('Response:', response.data);
            onClose();
        }
        catch (err) {
            console.error('Error submitting request:', err);
            setError('Error submitting request');
        }
    };
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Create Department" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Name" }), _jsx("input", { type: "text", id: "name", value: name, onChange: (e) => setName(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" }), error && _jsx("p", { className: "text-red-500", children: error })] }), _jsxs(CardFooter, { className: "flex justify-between mt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) })] }));
};
export default CreateDepartment;
