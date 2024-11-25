import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, message, Modal, Input } from 'antd';
import { Button } from '@/components/ui/button';
const LocationTable = ({ refreshTable, onTableRefreshed }) => {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLocations, setTotalLocations] = useState(0);
    const [editingLocation, setEditingLocation] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const locationsPerPage = 10;
    useEffect(() => {
        fetchLocations();
    }, [currentPage, refreshTable]);
    const fetchLocations = async () => {
        try {
            const response = await axios.get(`http://172.18.7.27:8000/api/locations/?skip=${(currentPage - 1) * locationsPerPage}&limit=${locationsPerPage}`);
            setLocations(response.data);
            setTotalLocations(response.data.length);
            if (refreshTable) {
                onTableRefreshed();
            }
        }
        catch (error) {
            console.error('Error fetching locations:', error);
            message.error({
                content: 'Failed to fetch locations. Please try again later.',
                style: {
                    marginTop: '20vh',
                },
            });
        }
    };
    const handleEdit = async (locationID) => {
        try {
            // http://172.18.7.27:8000/api/locations/?skip=0&limit=10
            const response = await axios.get(`http://172.18.7.27:8000/api/locations/${locationID}`);
            setEditingLocation(response.data);
            setIsEditing(true);
        }
        catch (error) {
            console.error('Error fetching location details:', error);
            message.error({
                content: 'Failed to fetch location details. Please try again later.',
                style: {
                    marginTop: '20vh',
                },
            });
        }
    };
    const handleDelete = async (locationID) => {
        try {
            await axios.delete(`http://172.18.7.27:8000/api/locations/${locationID}`);
            message.success({
                content: 'Location deleted successfully',
                style: {
                    marginTop: '20vh',
                },
            });
            setLocations(locations.filter(location => location.LocationID !== locationID));
        }
        catch (error) {
            console.error('Error deleting location:', error);
            message.error({
                content: 'Failed to delete location. Please try again later.',
                style: {
                    marginTop: '20vh',
                },
            });
        }
    };
    const handleSave = async () => {
        if (!editingLocation)
            return;
        setLoading(true);
        try {
            await axios.put(`http://172.18.7.27:8000/api/locations/${editingLocation.LocationID}`, editingLocation);
            message.success({
                content: 'Location updated successfully',
                style: {
                    marginTop: '20vh',
                },
            });
            setIsEditing(false);
            fetchLocations();
        }
        catch (error) {
            console.error('Error updating location:', error);
            message.error({
                content: 'Failed to update location. Please try again later.',
                style: {
                    marginTop: '20vh',
                },
            });
        }
        finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setIsEditing(false);
        setEditingLocation(null);
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const columns = [
        {
            title: 'Location ID',
            dataIndex: 'LocationID',
            key: 'LocationID',
            sorter: (a, b) => a.LocationID - b.LocationID,
        },
        {
            title: 'Location Name',
            dataIndex: 'LocationName',
            key: 'LocationName',
            filters: Array.from(new Set(locations.map(location => location.LocationName))).map(LocationName => ({ text: LocationName, value: LocationName })),
            onFilter: (value, record) => record.LocationName.includes(value),
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
            filters: Array.from(new Set(locations.map(location => location.Address))).map(Address => ({ text: Address, value: Address })),
            onFilter: (value, record) => record.Address.includes(value),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (_jsxs("span", { children: [_jsx(Button, { onClick: () => handleEdit(record.LocationID), className: "mr-2 mb-2 w-16", children: "Edit" }), _jsx(Button, { onClick: () => handleDelete(record.LocationID), className: "mr-2 w-16", children: "Delete" })] })),
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const totalPages = Math.ceil(totalLocations / locationsPerPage);
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl text-center font-bold mt-2", children: "Location" }), _jsx(Table, { columns: columns, dataSource: locations, rowKey: "LocationID", bordered: true, 
                // pagination={false}
                onChange: onChange }), isEditing && editingLocation && (_jsxs(Modal, { visible: isEditing, title: "Edit Location", onCancel: handleCancel, onOk: handleSave, confirmLoading: loading, okButtonProps: { style: { backgroundColor: '#1890ff', color: '#fff' } }, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "locationName", className: "block text-sm font-medium text-gray-700", children: "Location Name" }), _jsx(Input, { id: "locationName", value: editingLocation.LocationName, onChange: (e) => setEditingLocation({ ...editingLocation, LocationName: e.target.value }) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "address", className: "block text-sm font-medium text-gray-700", children: "Address" }), _jsx(Input, { id: "address", value: editingLocation.Address, onChange: (e) => setEditingLocation({ ...editingLocation, Address: e.target.value }) })] })] }))] }));
};
export default LocationTable;
