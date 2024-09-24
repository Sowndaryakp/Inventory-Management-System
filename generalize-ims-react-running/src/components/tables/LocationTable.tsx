import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, message, Modal, Input } from 'antd';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface Location {
  LocationID: number;
  LocationName: string;
  Address: string;
}

interface LocationTableProps {
  refreshTable: boolean;
  onTableRefreshed: () => void;
}

const LocationTable: React.FC<LocationTableProps> = ({ refreshTable, onTableRefreshed }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalLocations, setTotalLocations] = useState<number>(0);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
    } catch (error) {
      console.error('Error fetching locations:', error);
      message.error({
        content: 'Failed to fetch locations. Please try again later.',
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  const handleEdit = async (locationID: number) => {
    try {
      // http://172.18.7.27:8000/api/locations/?skip=0&limit=10
      const response = await axios.get(`http://172.18.7.27:8000/api/locations/${locationID}`);
      setEditingLocation(response.data);
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching location details:', error);
      message.error({
        content: 'Failed to fetch location details. Please try again later.',
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  const handleDelete = async (locationID: number) => {
    try {
      await axios.delete(`http://172.18.7.27:8000/api/locations/${locationID}`);
      message.success({
        content: 'Location deleted successfully',
        style: {
          marginTop: '20vh',
        },
      });
      setLocations(locations.filter(location => location.LocationID !== locationID));
    } catch (error) {
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
    if (!editingLocation) return;
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
    } catch (error) {
      console.error('Error updating location:', error);
      message.error({
        content: 'Failed to update location. Please try again later.',
        style: {
          marginTop: '20vh',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingLocation(null);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      title: 'Location ID',
      dataIndex: 'LocationID',
      key: 'LocationID',
      
      sorter: (a: Location, b: Location) => a.LocationID - b.LocationID,
    },
    {
      title: 'Location Name',
      dataIndex: 'LocationName',
      key: 'LocationName',
      filters: Array.from(new Set(locations.map(location => location.LocationName))).map(LocationName => ({ text: LocationName, value: LocationName })),
      onFilter: (value, record) => record.LocationName.includes(value as string),
    },
    {
      title: 'Address',
      dataIndex: 'Address',
      key: 'Address',
      filters: Array.from(new Set(locations.map(location => location.Address))).map(Address => ({ text: Address, value: Address })),
      onFilter: (value, record) => record.Address.includes(value as string),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Location) => (
        <span>
          <Button onClick={() => handleEdit(record.LocationID)} className="mr-2 mb-2 w-16">Edit</Button>
          <Button onClick={() => handleDelete(record.LocationID)} className="mr-2 w-16">Delete</Button>
        </span>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const totalPages = Math.ceil(totalLocations / locationsPerPage);

  return (
    <div>
       <h2  className="text-2xl text-center font-bold mt-2">Location</h2>
      <Table
        columns={columns}
        dataSource={locations}
        rowKey="LocationID"
        bordered
        // pagination={false}
        onChange={onChange}
      />

      {/* <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages).keys()].map((number) => (
            <PaginationItem key={number + 1}>
              <PaginationLink href="#" onClick={() => paginate(number + 1)} isActive={currentPage === number + 1}>
                {number + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> */}

      {isEditing && editingLocation && (
        <Modal
          visible={isEditing}
          title="Edit Location"
          onCancel={handleCancel}
          onOk={handleSave}
          confirmLoading={loading}
          okButtonProps={{ style: { backgroundColor: '#1890ff', color: '#fff' } }} // Custom styles for the OK button
        >
          <div className="mb-4">
            <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">Location Name</label>
            <Input
              id="locationName"
              value={editingLocation.LocationName}
              onChange={(e) => setEditingLocation({ ...editingLocation, LocationName: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <Input
              id="address"
              value={editingLocation.Address}
              onChange={(e) => setEditingLocation({ ...editingLocation, Address: e.target.value })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LocationTable;
