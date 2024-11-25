import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const CreateLocationRequest = ({ onClose }) => {
    const [locationID, setLocationID] = useState(0);
    const [locationName, setLocationName] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        fetchLocations();
    }, []);
    const fetchLocations = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/api/locations/');
            setLocations(response.data);
        }
        catch (error) {
            console.error('Error fetching locations:', error);
        }
    };
    useEffect(() => {
        fetchLocations();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!locationName || !address) {
            setError('All fields are required');
            return;
        }
        try {
            const response = await axios.post('http://172.18.7.27:8000/api/locations/', {
                LocationName: locationName,
                Address: address,
            });
            console.log('Response:', response.data);
            onClose();
        }
        catch (err) {
            console.error('Error submitting request:', err);
            setError('Error submitting request');
        }
    };
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Create New Location Request" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "locationName", className: "block text-sm font-medium text-gray-700", children: "Location Name" }), _jsx("input", { type: "text", id: "locationName", value: locationName, onChange: (e) => setLocationName(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "address", className: "block text-sm font-medium text-gray-700", children: "Address" }), _jsx("input", { type: "text", id: "address", value: address, onChange: (e) => setAddress(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), error && _jsx("p", { className: "text-red-500", children: error }), _jsxs(CardFooter, { className: "flex justify-between mt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) })] }));
};
export default CreateLocationRequest;
