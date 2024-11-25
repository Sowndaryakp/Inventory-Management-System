import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table } from 'antd';
import { Search } from 'lucide-react';
const SearchBatchId = () => {
    const [batchID, setBatchID] = useState('');
    const [batchDetails, setBatchDetails] = useState(null);
    const [error, setError] = useState('');
    const handleSearch = async () => {
        if (!batchID) {
            setError('Batch ID is required');
            return;
        }
        try {
            const response = await axios.get(`http://172.18.7.27:8000/api/${batchID}`);
            setBatchDetails(response.data);
            setError('');
        }
        catch (err) {
            console.error('Error fetching batch details:', err);
            setError('Error fetching batch details');
            setBatchDetails(null);
        }
    };
    const columns = [
        {
            title: 'Tool ID',
            dataIndex: 'ToolID',
            key: 'ToolID',
        },
        {
            title: 'Batch Number',
            dataIndex: 'BatchNumber',
            key: 'BatchNumber',
        },
        {
            title: 'Manufacture Date',
            dataIndex: 'ManufactureDate',
            key: 'ManufactureDate',
        },
        {
            title: 'Expiry Date',
            dataIndex: 'ExpiryDate',
            key: 'ExpiryDate',
        },
        {
            title: 'Batch ID',
            dataIndex: 'BatchID',
            key: 'BatchID',
        },
    ];
    return (_jsxs(Card, { className: "w-auto mx-auto", children: [_jsx(CardContent, { className: "w-96 ", children: _jsxs("div", { className: "mt-2 -mb-6 flex items-center", children: [_jsx("label", { htmlFor: "batchID", className: "block text-base font-medium text-gray-700 mr-2", children: "Batch_ID" }), _jsxs("div", { className: "relative flex-grow", children: [_jsx("input", { type: "text", id: "batchID", value: batchID, onChange: (e) => setBatchID(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full pl-8" }), _jsx(Search, { className: "absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400" })] }), error && _jsx("p", { className: "text-red-500 mt-2", children: error }), _jsx(Button, { onClick: handleSearch, className: "mt-1 ml-4", children: "Search" })] }) }), _jsx(CardFooter, { children: batchDetails && (_jsx("div", { className: "overflow-x-auto", children: _jsx(Table, { columns: columns, dataSource: [batchDetails], rowKey: "BatchID", 
                        // pagination={false}
                        bordered: true, className: "w-full" }) })) })] }));
};
export default SearchBatchId;
