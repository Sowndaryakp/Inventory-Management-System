import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
const ApproveRequests = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        fetchRequests();
    }, []);
    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/request_details');
            setRequests(response.data);
        }
        catch (error) {
            console.error('Error fetching requests:', error);
        }
    };
    return (_jsx("div", { className: "overflow-auto max-w-full", children: _jsxs(Table, { className: "min-w-full sm:min-w-[600px]", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "p-2", children: "RequestID" }), _jsx(TableHead, { className: "p-2", children: "UserID" }), _jsx(TableHead, { className: "p-2", children: "UserName" }), _jsx(TableHead, { className: "p-2", children: "ToolID" }), _jsx(TableHead, { className: "p-2", children: "ToolName" }), _jsx(TableHead, { className: "p-2", children: "QuantityNeeded" }), _jsx(TableHead, { className: "p-2", children: "PurposeOfUse" }), _jsx(TableHead, { className: "p-2", children: "AdditionalComments" }), _jsx(TableHead, { className: "p-2", children: "RequestDate" }), _jsx(TableHead, { className: "p-2", children: "Status" })] }) }), _jsx(TableBody, { children: requests.map((request) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "p-2", children: request.RequestID }), _jsx(TableCell, { className: "p-2", children: request.UserID }), _jsx(TableCell, { className: "p-2", children: request.UserName }), _jsx(TableCell, { className: "p-2", children: request.ToolID }), _jsx(TableCell, { className: "p-2", children: request.ToolName }), _jsx(TableCell, { className: "p-2", children: request.QuantityNeeded }), _jsx(TableCell, { className: "p-2", children: request.PurposeOfUse }), _jsx(TableCell, { className: "p-2", children: request.AdditionalComments }), _jsx(TableCell, { className: "p-2", children: new Date(request.RequestDate).toLocaleString() }), _jsx(TableCell, { className: "p-2", children: request.Status })] }, request.RequestID))) })] }) }));
};
export default ApproveRequests;
