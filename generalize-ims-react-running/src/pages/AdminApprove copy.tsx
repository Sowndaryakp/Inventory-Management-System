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

interface Request {
  RequestID: number;
  UserID: number;
  UserName: string;
  ToolID: number;
  ToolName: string;
  QuantityNeeded: number;
  PurposeOfUse: string;
  AdditionalComments: string;
  RequestDate: string;
  Status: string;
}

const ApproveRequests: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get<Request[]>('http://172.18.7.27:8000/request_details');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  return (
    <div className="overflow-auto max-w-full">
      <Table className="min-w-full sm:min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="p-2">RequestID</TableHead>
            <TableHead className="p-2">UserID</TableHead>
            <TableHead className="p-2">UserName</TableHead>
            <TableHead className="p-2">ToolID</TableHead>
            <TableHead className="p-2">ToolName</TableHead>
            <TableHead className="p-2">QuantityNeeded</TableHead>
            <TableHead className="p-2">PurposeOfUse</TableHead>
            <TableHead className="p-2">AdditionalComments</TableHead>
            <TableHead className="p-2">RequestDate</TableHead>
            <TableHead className="p-2">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.RequestID}>
              <TableCell className="p-2">{request.RequestID}</TableCell>
              <TableCell className="p-2">{request.UserID}</TableCell>
              <TableCell className="p-2">{request.UserName}</TableCell>
              <TableCell className="p-2">{request.ToolID}</TableCell>
              <TableCell className="p-2">{request.ToolName}</TableCell>
              <TableCell className="p-2">{request.QuantityNeeded}</TableCell>
              <TableCell className="p-2">{request.PurposeOfUse}</TableCell>
              <TableCell className="p-2">{request.AdditionalComments}</TableCell>
              <TableCell className="p-2">{new Date(request.RequestDate).toLocaleString()}</TableCell>
              <TableCell className="p-2">{request.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApproveRequests;
