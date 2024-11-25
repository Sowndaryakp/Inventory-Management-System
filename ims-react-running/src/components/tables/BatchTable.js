import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import { Button } from '@/components/ui/button';
const ToolTable = ({ refreshTable, onTableRefreshed }) => {
    const [tools, setTools] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const toolsPerPage = 7;
    useEffect(() => {
        fetchTools();
    }, [currentPage, refreshTable]);
    const fetchTools = async () => {
        try {
            const response = await axios.get(`http://172.18.7.27:8000/api/?skip=${(currentPage - 1) * toolsPerPage}&limit=${toolsPerPage}`);
            setTools(response.data);
            if (refreshTable) {
                onTableRefreshed();
            }
        }
        catch (error) {
            console.error('Error fetching tools:', error);
        }
    };
    const handleEdit = (toolID) => {
        console.log(`Edit tool with ID: ${toolID}`);
    };
    const handleDelete = (toolID) => {
        console.log(`Delete tool with ID: ${toolID}`);
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const columns = [
        {
            title: 'Tool ID',
            dataIndex: 'ToolID',
            key: 'ToolID',
            sorter: (a, b) => a.ToolID - b.ToolID,
        },
        {
            title: 'Batch Number',
            dataIndex: 'BatchNumber',
            key: 'BatchNumber',
            filters: Array.from(new Set(tools.map(tool => tool.BatchNumber))).map(batchNumber => ({ text: batchNumber, value: batchNumber })),
            onFilter: (value, record) => record.BatchNumber.includes(value),
        },
        {
            title: 'Manufacture Date',
            dataIndex: 'ManufactureDate',
            key: 'ManufactureDate',
            sorter: (a, b) => new Date(a.ManufactureDate).getTime() - new Date(b.ManufactureDate).getTime(),
        },
        {
            title: 'Expiry Date',
            dataIndex: 'ExpiryDate',
            key: 'ExpiryDate',
            sorter: (a, b) => new Date(a.ExpiryDate).getTime() - new Date(b.ExpiryDate).getTime(),
        },
        {
            title: 'Batch ID',
            dataIndex: 'BatchID',
            key: 'BatchID',
            sorter: (a, b) => a.BatchID - b.BatchID,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (_jsx("span", { children: _jsxs("div", { className: "overflow-x-auto", children: [_jsx(Button, { onClick: () => handleEdit(record.ToolID), className: "mr-2 mb-2 w-16", children: "Edit" }), _jsx(Button, { onClick: () => handleDelete(record.ToolID), className: "mr-2 w-16", children: "Delete" })] }) })),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const totalPages = Math.ceil(tools.length / toolsPerPage);
    return (_jsx("div", { children: _jsx(Table, { columns: columns, dataSource: tools, rowKey: "ToolID", 
            // pagination={false}
            onChange: onChange, bordered: true }) }));
};
export default ToolTable;
