import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CiWarning, CiCircleCheck } from "react-icons/ci";

interface Tool {
  ToolName: string;
  QuantityAvailable: number;
  Status: string;
  Location: string;
  ToolID: number;
  LastUpdated: string | null;
}

interface ToolRequest {
  UserID: number;
  ToolID: number;
  QuantityNeeded: number;
  PurposeOfUse: string;
  AdditionalComments: string;
  RequestDate: string;
  Status: string;
  AdminID: number;
  AdminApprovalDate: string;
  RequestID: number;
}

const App: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<ToolRequest | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editableRequest, setEditableRequest] = useState<ToolRequest | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Tool[]>('http://172.18.7.27:8000/tools');
        setTools(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRequestClick = async (toolID: number) => {
    try {
      const response = await axios.get<ToolRequest>(`http://172.18.7.27:8000/tool_requests/${toolID}`);
      const currentDate = new Date().toLocaleString('en-US');
      setSelectedRequest(response.data);
      setEditableRequest({
        ...response.data,
        AdminApprovalDate: currentDate,
        AdminID: 1, // Assuming AdminID is 1, you can change it accordingly
      });
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching request data:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "In Use") {
      return <CiWarning className="inline-block" />;
    } else if (status === "Available") {
      return <CiCircleCheck className="inline-block" />;
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editableRequest) {
      const { name, value } = e.target;
      setEditableRequest({
        ...editableRequest,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    if (editableRequest) {
      try {
        await axios.put(`http://172.18.7.27:8000/tool_requests/${editableRequest.RequestID}`, editableRequest);
        console.log('Saved request:', editableRequest);
        setShowModal(false);
      } catch (error) {
        console.error('Error saving request:', error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4 p-7">
          <Card className='w-44'>
            <CardHeader>
              <CardTitle>cgjnhmj</CardTitle>
              <CardDescription>
               uytj
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className='w-44'>
            <CardHeader>
              <CardTitle>cgjnhmj</CardTitle>
              <CardDescription>
               uytj
              </CardDescription>
            </CardHeader>
          </Card>
      </div>
      <div className="overflow-auto max-w-full">
        <Table className="min-w-full sm:min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6 p-2">ToolName</TableHead>
              <TableHead className="w-1/6 p-2">QuantityAvailable</TableHead>
              <TableHead className="w-1/6 p-2">Status</TableHead>
              <TableHead className="w-1/6 p-2">Location</TableHead>
              <TableHead className="w-1/6 p-2">ToolID</TableHead>
              <TableHead className="w-1/6 p-2">LastUpdated</TableHead>
              <TableHead className="w-1/6 p-2">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.map((tool, index) => (
              <TableRow key={index}>
                <TableCell className="p-2">{tool.ToolName}</TableCell>
                <TableCell className="p-2">{tool.QuantityAvailable}</TableCell>
                <TableCell className="p-2">
                  {getStatusIcon(tool.Status)} {tool.Status}
                </TableCell>
                <TableCell className="p-2">{tool.Location}</TableCell>
                <TableCell className="p-2">{tool.ToolID}</TableCell>
                <TableCell className="p-2">{tool.LastUpdated}</TableCell>
                <TableCell className="p-2">
                  <button
                    onClick={() => handleRequestClick(tool.ToolID)}
                    className="text-blue-500 hover:underline"
                  >
                    Request
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {showModal && editableRequest && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      {/* <CardHeader>
        <CardTitle>Request Details</CardTitle>
        <CardDescription>Status: {editableRequest.Status}</CardDescription>
      </CardHeader> */}
      <div className="p-4 flex flex-col">
        <div className="mb-2 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-sm font-bold mb-1">UserID:</label>
            <input
              type="text"
              name="UserID"
              value={editableRequest.UserID}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-bold mb-1">ToolID:</label>
            <input
              type="text"
              name="ToolID"
              value={editableRequest.ToolID}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Quantity Needed:</label>
          <input
            type="number"
            name="QuantityNeeded"
            value={editableRequest.QuantityNeeded}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Purpose Of Use:</label>
          <textarea
            name="PurposeOfUse"
            value={editableRequest.PurposeOfUse}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold mb-1">Additional Comments:</label>
          <textarea
            name="AdditionalComments"
            value={editableRequest.AdditionalComments}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
            </div>
          </div>
        </div>
      )}
    </>
 
  );
};

export default App;