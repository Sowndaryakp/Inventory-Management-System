import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Select from 'react-select';
import { Modal } from 'antd'; // Import Modal from Ant Design
const CreateToolLocationRequest = ({ onClose }) => {
    const [toolIDOptions, setToolOptions] = useState([]);
    const [locationIDOptions, setLocationIDOptions] = useState([]);
    const [toolID, setToolID] = useState(null);
    const [locationID, setLocationID] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [error, setError] = useState('');
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    useEffect(() => {
        fetchToolIDOptions();
        fetchLocationIDOptions();
    }, []);
    const fetchToolIDOptions = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/tools');
            const tools = response.data;
            const options = tools.map(tool => ({
                value: tool.ToolID,
                label: `${tool.ToolName} (ID: ${tool.ToolID})`,
            }));
            setToolOptions(options);
        }
        catch (error) {
            console.error('Error fetching tool options:', error);
        }
    };
    const fetchLocationIDOptions = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/api/tool-locations/?skip=0&limit=10');
            const options = response.data.map((location) => ({
                value: location.LocationID,
                label: `${location.LocationID}`,
            }));
            setLocationIDOptions(options);
        }
        catch (error) {
            console.error('Error fetching location IDs:', error);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!toolID || !locationID || !quantity) {
            setError('All fields are required');
            return;
        }
        try {
            const response = await axios.post('http://172.18.7.27:8000/api/tool-locations/', {
                ToolID: toolID,
                LocationID: locationID,
                Quantity: quantity,
            });
            console.log('Response:', response.data);
            setModalMessage('Tool location added successfully');
            setSuccessModalVisible(true); // Show success modal
            onClose();
        }
        catch (err) {
            console.error('Error submitting request:', err);
            setError('Error submitting request');
        }
    };
    const handleModalOk = () => {
        setSuccessModalVisible(false);
        setModalMessage('');
        setToolID(null); // Reset form fields
        setLocationID(null);
        setQuantity(0);
    };
    const handleModalCancel = () => {
        setSuccessModalVisible(false);
        setModalMessage('');
    };
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Create New Tool Location" }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "toolID", className: "block text-sm font-medium text-gray-700", children: "Tool ID" }), _jsx(Select, { id: "toolID", options: toolIDOptions, onChange: (option) => setToolID(option?.value || null) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "locationID", className: "block text-sm font-medium text-gray-700", children: "Location ID" }), _jsx(Select, { id: "locationID", options: locationIDOptions, onChange: (option) => setLocationID(option?.value || null) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "quantity", className: "block text-sm font-medium text-gray-700", children: "Quantity" }), _jsx("input", { type: "number", id: "quantity", value: quantity, onChange: (e) => setQuantity(parseInt(e.target.value)), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), error && _jsx("p", { className: "text-red-500", children: error }), _jsxs(CardFooter, { className: "flex justify-between mt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) }), _jsx(Modal, { title: "Success", visible: successModalVisible, onOk: handleModalOk, onCancel: handleModalCancel, children: _jsx("p", { children: modalMessage }) })] }));
};
export default CreateToolLocationRequest;
