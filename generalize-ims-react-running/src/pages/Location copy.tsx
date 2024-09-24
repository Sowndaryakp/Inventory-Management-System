import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationTable from '../components/tables/LocationTable';
import ToolsLocationTable from '../components/tables/ToolsLocationTable';
import SearchLocationId from '../components/tables/SearchLocationId';
import AddNewLocationTools from '../components/allcards/AddNewLocationTools';
import AddNewToolLocations from '../components/allcards/AddNewToolLocations';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button, Modal, Input, message } from 'antd';
const LocationPage: React.FC = () => {
  const [refreshTable, setRefreshTable] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [newLocation, setNewLocation] = useState<{ LocationName: string; Address: string }>({
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
    } catch (error) {
      console.error('Error adding location:', error);
      message.error('Failed to add location. Please try again later.');
    }
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showAddModal}>
        Add New Location
      </Button>
      <LocationTable refreshTable={refreshTable} onTableRefreshed={() => setRefreshTable(false)} />
      <Modal
        title="Add New Location"
        visible={isAddModalVisible}
        // onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <div className="mb-4">
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">
            Location Name
          </label>
          <Input
            id="locationName"
            value={newLocation.LocationName}
            onChange={(e) => setNewLocation({ ...newLocation, LocationName: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <Input
            id="address"
            value={newLocation.Address}
            onChange={(e) => setNewLocation({ ...newLocation, Address: e.target.value })}
          />
        </div>
      </Modal>
    </div>
  );
};

export default LocationPage;
