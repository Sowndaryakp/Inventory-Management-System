import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// to add search enter all the columns
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
const ApproveRequests = () => {
    const [requests, setRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [sortOrder, setSortOrder] = useState({ key: '', order: null });
    const itemsPerPage = 20;
    useEffect(() => {
        fetchRequests();
        setCurrentPage(1); // Reset currentPage to 1 whenever requests are fetched
    }, [currentPage]);
    useEffect(() => {
        applyFiltersAndSorting();
    }, [requests, filters, sortOrder]);
    // const fetchRequests = async () => {
    //   try {
    //     const response = await axios.get<Request[]>('http://172.18.7.27:8000/request_details');
    //     setRequests(response.data);
    //     setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    //   } catch (error) {
    //     console.error('Error fetching requests:', error);
    //   }
    // };
    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/request_details');
            setTotalPages(Math.ceil(response.data.length / itemsPerPage));
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            setRequests(response.data.slice(startIndex, endIndex));
            setCurrentPage(1); // Reset currentPage to 1 after fetching new requests
        }
        catch (error) {
            console.error('Error fetching requests:', error);
        }
    };
    const handleApprove = async (requestId) => {
        try {
            await axios.put(`http://172.18.7.27:8000/tool_requests/${requestId}/approve`);
            setRequests(prevRequests => prevRequests.map(request => request.RequestID === requestId ? { ...request, Status: 'Approved' } : request));
        }
        catch (error) {
            console.error('Error approving request:', error);
        }
    };
    const applyFiltersAndSorting = () => {
        let filtered = [...requests];
        // Apply filters
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                filtered = filtered.filter(request => String(request[key]).includes(filters[key]));
            }
        });
        // Apply sorting
        if (sortOrder.order) {
            filtered.sort((a, b) => {
                const aValue = String(a[sortOrder.key]);
                const bValue = String(b[sortOrder.key]);
                if (sortOrder.order === 'ascend') {
                    return aValue.localeCompare(bValue);
                }
                else {
                    return bValue.localeCompare(aValue);
                }
            });
        }
        setFilteredRequests(filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    };
    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };
    const handleSortChange = (key) => {
        setSortOrder(prevSortOrder => ({
            key,
            order: prevSortOrder.key === key && prevSortOrder.order === 'ascend' ? 'descend' : 'ascend',
        }));
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (_jsxs("div", { className: "overflow-auto max-w-full", children: [_jsx("div", { className: "shadow-md rounded-lg overflow-hidden", children: _jsxs(Table, { className: "min-w-full sm:min-w-[600px]", children: [_jsx(TableHeader, { children: _jsx(TableRow, { children: ['RequestID', 'UserID', 'UserName', 'ToolID', 'ToolName', 'QuantityNeeded', 'PurposeOfUse', 'AdditionalComments', 'RequestDate', 'Status'].map(key => (_jsx(TableHead, { className: "p-2", children: _jsxs("div", { className: "flex items-center", children: [key, _jsx("input", { type: "text", className: "ml-2 border rounded p-1", placeholder: `Filter by ${key}`, value: filters[key] || '', onChange: e => handleFilterChange(key, e.target.value) }), _jsx("button", { className: "ml-2", onClick: () => handleSortChange(key), children: sortOrder.key === key && sortOrder.order ? (sortOrder.order === 'ascend' ? '🔼' : '🔽') : '🔽' })] }) }, key))) }) }), _jsx(TableBody, { children: filteredRequests.map(request => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "p-2", children: request.RequestID }), _jsx(TableCell, { className: "p-2", children: request.UserID }), _jsx(TableCell, { className: "p-2", children: request.UserName }), _jsx(TableCell, { className: "p-2", children: request.ToolID }), _jsx(TableCell, { className: "p-2", children: request.ToolName }), _jsx(TableCell, { className: "p-2", children: request.QuantityNeeded }), _jsx(TableCell, { className: "p-2", children: request.PurposeOfUse }), _jsx(TableCell, { className: "p-2", children: request.AdditionalComments }), _jsx(TableCell, { className: "p-2", children: new Date(request.RequestDate).toLocaleString() }), _jsx(TableCell, { className: "p-2", children: request.Status === 'Approved' ? (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-4 h-4 bg-green-500 rounded-full mr-2" }), "Approved"] })) : (_jsx("button", { className: "bg-red-500 text-white px-2 py-1 w-24 rounded", onClick: () => handleApprove(request.RequestID), children: "Pending" })) })] }, request.RequestID))) })] }) }), _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#", onClick: () => setCurrentPage(prevPage => Math.max(prevPage - 1, 1)), disabled: currentPage === 1 }) }), [...Array(totalPages).keys()].map(number => (_jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", onClick: () => paginate(number + 1), isActive: currentPage === number + 1, children: number + 1 }) }, number))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#", onClick: () => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages)), disabled: currentPage === totalPages }) })] }) })] }));
};
export default ApproveRequests;
