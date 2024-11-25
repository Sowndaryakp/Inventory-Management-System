import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const RequestCard = ({ toolID, toolName, quantityAvailable, onClose }) => {
    const [userID, setUserID] = useState();
    const [quantityNeeded, setQuantityNeeded] = useState();
    const [purposeOfUse, setPurposeOfUse] = useState("");
    const [additionalComments, setAdditionalComments] = useState("");
    const [validationError, setValidationError] = useState("");
    const handleSubmit = async () => {
        if (quantityNeeded && quantityNeeded > quantityAvailable) {
            setValidationError("Quantity needed exceeds available quantity.");
            return;
        }
        try {
            const currentDate = new Date().toISOString();
            const requestData = {
                UserID: userID,
                ToolID: toolID,
                QuantityNeeded: quantityNeeded,
                PurposeOfUse: purposeOfUse,
                AdditionalComments: additionalComments,
                RequestDate: currentDate,
                Status: "Pending",
                AdminID: 0,
                AdminApprovalDate: currentDate
            };
            // Send POST request to backend API
            const response = await axios.post('http://172.18.7.27:8000/tool_requests', requestData);
            console.log('Response:', response.data);
            onClose(); // Close the RequestCard after successful submission
        }
        catch (error) {
            console.error('Error submitting request:', error);
            // Handle error if needed
        }
    };
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Request for ", toolName] }), _jsx(CardDescription, { children: "Tool ID" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "toolID", className: "block text-sm font-medium text-gray-700", children: "Tool ID" }), _jsx("input", { type: "text", id: "toolID", value: toolID, className: "mt-1 p-2 border border-gray-300 rounded-md w-full", readOnly: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "userID", className: "block text-sm font-medium text-gray-700", children: "User ID" }), _jsx("input", { type: "number", id: "userID", value: userID, onChange: (e) => setUserID(Number(e.target.value)), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "quantityNeeded", className: "block text-sm font-medium text-gray-700", children: "Quantity Needed" }), _jsx("input", { type: "number", id: "quantityNeeded", value: quantityNeeded, onChange: (e) => setQuantityNeeded(Number(e.target.value)), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" }), validationError && _jsx("p", { className: "text-red-500", children: validationError })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "purposeOfUse", className: "block text-sm font-medium text-gray-700", children: "Purpose of Use" }), _jsx("input", { type: "text", id: "purposeOfUse", value: purposeOfUse, onChange: (e) => setPurposeOfUse(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "additionalComments", className: "block text-sm font-medium text-gray-700", children: "Additional Comments" }), _jsx("input", { type: "text", id: "additionalComments", value: additionalComments, onChange: (e) => setAdditionalComments(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "requestDate", className: "block text-sm font-medium text-gray-700", children: "Request Date" }), _jsx("input", { type: "text", id: "requestDate", value: new Date().toISOString(), className: "mt-1 p-2 border border-gray-300 rounded-md w-full", readOnly: true })] })] }) }), _jsxs(CardFooter, { className: "flex justify-between mt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", onClick: handleSubmit, children: "Submit" })] })] }));
};
export default RequestCard;
