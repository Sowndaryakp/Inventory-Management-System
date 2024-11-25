import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import LocationTable from '../components/tables/LocationTable';
import { Button, Modal, Input, message } from 'antd';
const LocationPage = () => {
    const [refreshTable, setRefreshTable] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [newLocation, setNewLocation] = useState({
        LocationName: '',
        Address: '',
    });
    const showAddModal = () => {
        setIsAddModalVisible(true);
    };
    const handleAddOk = async () => {
        try {
            await axios.post('http://172.18.7.27:8000/api/locations/', newLocation);
            message.success('Location added successfully');
            setIsAddModalVisible(false);
            setRefreshTable((prev) => !prev); // Toggle the refreshTable state to trigger a table refresh
        }
        catch (error) {
            console.error('Error adding location:', error);
            message.error('Failed to add location. Please try again later.');
        }
    };
    const handleAddCancel = () => {
        setIsAddModalVisible(false);
    };
    return (_jsxs("div", { children: [_jsx(Button, { type: "primary", onClick: showAddModal, children: "Add New Location" }), _jsx(LocationTable, { refreshTable: refreshTable, onTableRefreshed: () => setRefreshTable(false) }), _jsxs(Modal, { title: "Add New Location", visible: isAddModalVisible, 
                // onOk={handleAddOk}
                onCancel: handleAddCancel, children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "locationName", className: "block text-sm font-medium text-gray-700", children: "Location Name" }), _jsx(Input, { id: "locationName", value: newLocation.LocationName, onChange: (e) => setNewLocation({ ...newLocation, LocationName: e.target.value }) })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "address", className: "block text-sm font-medium text-gray-700", children: "Address" }), _jsx(Input, { id: "address", value: newLocation.Address, onChange: (e) => setNewLocation({ ...newLocation, Address: e.target.value }) })] })] })] }));
};
export default LocationPage;
