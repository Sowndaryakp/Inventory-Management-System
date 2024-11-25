import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
const UserRegister = ({ onUserRegistered }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [departmentID, setDepartmentID] = useState(''); // Change the default value to an empty string
    const { toast } = useToast(); // Initialize the existing toast library
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://172.18.7.27:8000/users/?department_id=1', {
                UserName: userName,
                Email: email,
                Phone: phone,
                Address: address,
                DepartmentID: departmentID
            });
            console.log('User registered:', response.data);
            if (onUserRegistered && typeof onUserRegistered === 'function') {
                onUserRegistered();
            }
            clearFields(); // Clear input fields after successful registration
            toast.success('User registered successfully!'); // Display toast message using the existing toast library
        }
        catch (error) {
            console.error('Error registering user:', error);
            // Handle error if needed
        }
    };
    const clearFields = () => {
        setUserName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setDepartmentID(''); // Reset department ID to an empty string
    };
    return (_jsx("div", { className: "flex items-center justify-center h-full mt-10", children: _jsxs(Card, { className: "w-[400px]", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "User Registration" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "userName", className: "block text-sm font-medium text-gray-700", children: "User Name" }), _jsx("input", { type: "text", id: "userName", value: userName, onChange: (e) => setUserName(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full", required // Add required attribute for validation
                                        : true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700", children: "Email" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full", required // Add required attribute for validation
                                        : true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "phone", className: "block text-sm font-medium text-gray-700", children: "Phone" }), _jsx("input", { type: "tel", id: "phone", value: phone, onChange: (e) => setPhone(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full", required // Add required attribute for validation
                                        : true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "address", className: "block text-sm font-medium text-gray-700", children: "Address" }), _jsx("input", { type: "text", id: "address", value: address, onChange: (e) => setAddress(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full", required // Add required attribute for validation
                                        : true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "departmentID", className: "block text-sm font-medium text-gray-700", children: "Department ID" }), _jsx("input", { type: "number", id: "departmentID", value: departmentID, onChange: (e) => setDepartmentID(parseInt(e.target.value)), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsx(CardFooter, { className: "flex justify-between mt-4", children: _jsx(Button, { type: "submit", children: "Register" }) })] }) })] }) }));
};
export default UserRegister;
