import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CiWarning, CiCircleCheck } from "react-icons/ci";
const App = () => {
    const [tools, setTools] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editableRequest, setEditableRequest] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.18.7.27:8000/tools');
                setTools(response.data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleRequestClick = async (toolID) => {
        try {
            const response = await axios.get(`http://172.18.7.27:8000/tool_requests/${toolID}`);
            const currentDate = new Date().toLocaleString('en-US');
            setSelectedRequest(response.data);
            setEditableRequest({
                ...response.data,
                AdminApprovalDate: currentDate,
                AdminID: 1, // Assuming AdminID is 1, you can change it accordingly
            });
            setShowModal(true);
        }
        catch (error) {
            console.error('Error fetching request data:', error);
        }
    };
    const getStatusIcon = (status) => {
        if (status === "In Use") {
            return _jsx(CiWarning, { className: "inline-block" });
        }
        else if (status === "Available") {
            return _jsx(CiCircleCheck, { className: "inline-block" });
        }
        return null;
    };
    const handleInputChange = (e) => {
        if (editableRequest) {
            const { name, value } = e.target;
            setEditableRequest({
                ...editableRequest,
                [name]: value,
            });
        }
    };
    const handleSave = async () => {
        if (editableRequest) {
            try {
                await axios.put(`http://172.18.7.27:8000/tool_requests/${editableRequest.RequestID}`, editableRequest);
                console.log('Saved request:', editableRequest);
                setShowModal(false);
            }
            catch (error) {
                console.error('Error saving request:', error);
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-wrap gap-4 p-7", children: [_jsx(Card, { className: 'w-44', children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "cgjnhmj" }), _jsx(CardDescription, { children: "uytj" })] }) }), _jsx(Card, { className: 'w-44', children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "cgjnhmj" }), _jsx(CardDescription, { children: "uytj" })] }) })] }), _jsx("div", { className: "overflow-auto max-w-full", children: _jsxs(Table, { className: "min-w-full sm:min-w-[600px]", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-1/6 p-2", children: "ToolName" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "QuantityAvailable" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Status" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Location" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "ToolID" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "LastUpdated" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Action" })] }) }), _jsx(TableBody, { children: tools.map((tool, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "p-2", children: tool.ToolName }), _jsx(TableCell, { className: "p-2", children: tool.QuantityAvailable }), _jsxs(TableCell, { className: "p-2", children: [getStatusIcon(tool.Status), " ", tool.Status] }), _jsx(TableCell, { className: "p-2", children: tool.Location }), _jsx(TableCell, { className: "p-2", children: tool.ToolID }), _jsx(TableCell, { className: "p-2", children: tool.LastUpdated }), _jsx(TableCell, { className: "p-2", children: _jsx("button", { onClick: () => handleRequestClick(tool.ToolID), className: "text-blue-500 hover:underline", children: "Request" }) })] }, index))) })] }) }), showModal && editableRequest && (_jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded shadow-lg w-96", children: [_jsxs("div", { className: "p-4 flex flex-col", children: [_jsxs("div", { className: "mb-2 flex", children: [_jsxs("div", { className: "w-1/2 mr-2", children: [_jsx("label", { className: "block text-sm font-bold mb-1", children: "UserID:" }), _jsx("input", { type: "text", name: "UserID", value: editableRequest.UserID, onChange: handleInputChange, className: "w-full p-2 border rounded", readOnly: true })] }), _jsxs("div", { className: "w-1/2", children: [_jsx("label", { className: "block text-sm font-bold mb-1", children: "ToolID:" }), _jsx("input", { type: "text", name: "ToolID", value: editableRequest.ToolID, onChange: handleInputChange, className: "w-full p-2 border rounded", readOnly: true })] })] }), _jsxs("div", { className: "mb-2", children: [_jsx("label", { className: "block text-sm font-bold mb-1", children: "Quantity Needed:" }), _jsx("input", { type: "number", name: "QuantityNeeded", value: editableRequest.QuantityNeeded, onChange: handleInputChange, className: "w-full p-2 border rounded" })] }), _jsxs("div", { className: "mb-2", children: [_jsx("label", { className: "block text-sm font-bold mb-1", children: "Purpose Of Use:" }), _jsx("textarea", { name: "PurposeOfUse", value: editableRequest.PurposeOfUse, onChange: handleInputChange, className: "w-full p-2 border rounded" })] }), _jsxs("div", { className: "mb-2", children: [_jsx("label", { className: "block text-sm font-bold mb-1", children: "Additional Comments:" }), _jsx("textarea", { name: "AdditionalComments", value: editableRequest.AdditionalComments, onChange: handleInputChange, className: "w-full p-2 border rounded" })] })] }), _jsxs("div", { className: "flex justify-end", children: [_jsx("button", { onClick: () => setShowModal(false), className: "bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2", children: "Cancel" }), _jsx("button", { onClick: handleSave, className: "bg-blue-500 text-white py-2 px-4 rounded", children: "Save" })] })] }) }))] }));
};
export default App;
