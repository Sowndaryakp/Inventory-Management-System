import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, message, Modal, Input } from 'antd';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ToolLocation {
  ToolLocationID: number;
  ToolID: number;
  LocationID: number;
  Quantity: number;
}

interface LocationTableProps {
  refreshTable: boolean;
  onTableRefreshed: () => void;
}

const LocationTable: React.FC<LocationTableProps> = ({ refreshTable, onTableRefreshed }) => {
  const [toolLocations, setToolLocations] = useState<ToolLocation[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalToolLocations, setTotalToolLocations] = useState<number>(0);
  const [editingToolLocation, setEditingToolLocation] = useState<ToolLocation | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const toolLocationsPerPage = 10;

  useEffect(() => {
    fetchToolLocations();
  }, [currentPage, refreshTable]);

  const fetchToolLocations = async () => {
    try {
      const response = await axios.get(`http://172.18.7.27:8000/api/tool-locations/?skip=${(currentPage - 1) * toolLocationsPerPage}&limit=${toolLocationsPerPage}`);
      setToolLocations(response.data);
      setTotalToolLocations(response.data.length);
      if (refreshTable) {
        onTableRefreshed();
      }
    } catch (error) {
      console.error('Error fetching tool locations:', error);
      message.error({
        content: 'Failed to fetch tool locations. Please try again later.',
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  const handleEdit = async (toolLocationID: number, quantity: number) => {
    try {
      const response = await axios.get(`http://172.18.7.27:8000/api/tool-locations/${toolLocationID}?quantity=${quantity}`);
      setEditingToolLocation(response.data);
      setIsEditing(true);
      console.log("Editing Tools Location Table")
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching tool location details:', error);
      message.error({
        content: 'Failed to fetch tool location details. Please try again later.',
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  const handleDelete = async (toolLocationID: number) => {
    try {
      await axios.delete(`http://172.18.7.27:8000/api/tool-locations/${toolLocationID}`);
      message.success({
        content: 'Tool location deleted successfully',
        style: {
          marginTop: '20px',
          top: 0,
          right: 0,
        },
      });
      setToolLocations(toolLocations.filter(toolLocation => toolLocation.ToolLocationID !== toolLocationID));
    } catch (error) {
      console.error('Error deleting tool location:', error);
      message.error({
        content: 'Failed to delete tool location. Please try again later.',
        style: {
          marginTop: '20vh',
        },
      });
    }
  };

  const handleSave = async () => {
    if (!editingToolLocation) return;
    setLoading(true);
    try {
      await axios.put(`http://172.18.7.27:8000/api/tool-locations/${editingToolLocation.ToolLocationID}`, editingToolLocation);
      message.success({
        content: 'Tool location updated successfully',
        style: {
          marginTop: '20vh',
        },
      });
      setIsEditing(false);
      fetchToolLocations();
    } catch (error) {
      console.error('Error updating tool location:', error);
      message.error({
        content: 'Failed to update tool location. Please try again later.',
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
    setEditingToolLocation(null);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const columns = [
    {
      title: 'Tool Location ID',
      dataIndex: 'ToolLocationID',
      key: 'ToolLocationID',
      sorter: (a: ToolLocation, b: ToolLocation) => a.ToolLocationID - b.ToolLocationID,
    },
    {
      title: 'Tool ID',
      dataIndex: 'ToolID',
      key: 'ToolID',
      sorter: (a: ToolLocation, b: ToolLocation) => a.ToolID - b.ToolID,
    },
    {
      title: 'Location ID',
      dataIndex: 'LocationID',
      key: 'LocationID',
      sorter: (a: ToolLocation, b: ToolLocation) => a.LocationID - b.LocationID,
    },
    {
      title: 'Quantity',
      dataIndex: 'Quantity',
      key: 'Quantity',
      sorter: (a: ToolLocation, b: ToolLocation) => a.Quantity - b.Quantity,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: ToolLocation) => (
        <span>
          <Button onClick={() => handleEdit(record.ToolLocationID, record.Quantity)} className="mr-2 mb-2 w-16">Edit</Button>
          <Button onClick={() => handleDelete(record.ToolLocationID)} className="mr-2 w-16">Delete</Button>
        </span>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const totalPages = Math.ceil(totalToolLocations / toolLocationsPerPage);

  return (
    <div>
       <h2  className="text-2xl text-center font-bold mt-2">Tools Location</h2>
      <Table
        columns={columns}
        dataSource={toolLocations}
        rowKey="ToolLocationID"
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

      {isEditing && editingToolLocation && (
        <Modal
          visible={isEditing}
          title="Edit Tool Location"
          onCancel={handleCancel}
          onOk={handleSave}
          confirmLoading={loading}
          okButtonProps={{ style: { backgroundColor: '#1890ff', color: '#fff' } }} // Custom styles for the OK button
        >
          <div className="mb-4">
            <label htmlFor="toolID" className="block text-sm font-medium text-gray-700">Tool ID</label>
            <Input
              id="toolID"
              value={editingToolLocation.ToolID}
              onChange={(e) => setEditingToolLocation({ ...editingToolLocation, ToolID: parseInt(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="locationID" className="block text-sm font-medium text-gray-700">Location ID</label>
            <Input
              id="locationID"
              value={editingToolLocation.LocationID}
              onChange={(e) => setEditingToolLocation({ ...editingToolLocation, LocationID: parseInt(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <Input
              id="quantity"
              value={editingToolLocation.Quantity}
              onChange={(e) => setEditingToolLocation({ ...editingToolLocation, Quantity: parseInt(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="toolLocationID" className="block text-sm font-medium text-gray-700">Tool Location ID</label>
            <Input
              id="toolLocationID"
              value={editingToolLocation.ToolLocationID}
              onChange={(e) => setEditingToolLocation({ ...editingToolLocation, ToolLocationID: parseInt(e.target.value) })}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default LocationTable;
