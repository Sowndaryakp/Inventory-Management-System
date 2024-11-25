import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const CreateCategory = ({ onClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [parentID, setParentID] = useState(null);
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName) {
            setError('Category Name is required');
            return;
        }
        try {
            const response = await axios.post('http://172.18.7.27:8000/api/v1/categories/', {
                CategoryName: categoryName,
                ParentID: parentID,
            });
            console.log('Response:', response.data);
            onClose();
        }
        catch (err) {
            console.error('Error submitting request:', err);
            setError('Error submitting request');
        }
    };
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Create Category" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "categoryName", className: "block text-sm font-medium text-gray-700", children: "Category Name" }), _jsx("input", { type: "text", id: "categoryName", value: categoryName, onChange: (e) => setCategoryName(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" }), error && _jsx("p", { className: "text-red-500", children: error })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "parentID", className: "block text-sm font-medium text-gray-700", children: "Parent ID (optional)" }), _jsx("input", { type: "number", id: "parentID", value: parentID !== null ? parentID : '', onChange: (e) => setParentID(e.target.value ? parseInt(e.target.value) : null), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs(CardFooter, { className: "flex justify-between mt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) })] }));
};
export default CreateCategory;
