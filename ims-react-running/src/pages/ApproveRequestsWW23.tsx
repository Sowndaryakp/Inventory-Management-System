// to add search enter all the columns
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [sortOrder, setSortOrder] = useState<{ key: string, order: 'ascend' | 'descend' | null }>({ key: '', order: null });
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
      const response = await axios.get<Request[]>('http://172.18.7.27:8000/request_details');
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setRequests(response.data.slice(startIndex, endIndex));
      setCurrentPage(1); // Reset currentPage to 1 after fetching new requests
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
  
  

  const handleApprove = async (requestId: number) => {
    try {
      await axios.put(`http://172.18.7.27:8000/tool_requests/${requestId}/approve`);
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.RequestID === requestId ? { ...request, Status: 'Approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const applyFiltersAndSorting = () => {
    let filtered = [...requests];

    // Apply filters
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        filtered = filtered.filter(request => String(request[key as keyof Request]).includes(filters[key]));
      }
    });

    // Apply sorting
    if (sortOrder.order) {
      filtered.sort((a, b) => {
        const aValue = String(a[sortOrder.key as keyof Request]);
        const bValue = String(b[sortOrder.key as keyof Request]);

        if (sortOrder.order === 'ascend') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    setFilteredRequests(filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const handleSortChange = (key: string) => {
    setSortOrder(prevSortOrder => ({
      key,
      order: prevSortOrder.key === key && prevSortOrder.order === 'ascend' ? 'descend' : 'ascend',
    }));
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="overflow-auto max-w-full">
      <div className="shadow-md rounded-lg overflow-hidden">
        <Table className="min-w-full sm:min-w-[600px]">
          <TableHeader>
            <TableRow>
              {['RequestID', 'UserID', 'UserName', 'ToolID', 'ToolName', 'QuantityNeeded', 'PurposeOfUse', 'AdditionalComments', 'RequestDate', 'Status'].map(key => (
                <TableHead className="p-2" key={key}>
                  <div className="flex items-center">
                    {key}
                    <input
                      type="text"
                      className="ml-2 border rounded p-1"
                      placeholder={`Filter by ${key}`}
                      value={filters[key] || ''}
                      onChange={e => handleFilterChange(key, e.target.value)}
                    />
                    <button
                      className="ml-2"
                      onClick={() => handleSortChange(key)}
                    >
                      {sortOrder.key === key && sortOrder.order ? (sortOrder.order === 'ascend' ? '🔼' : '🔽') : '🔽'}
                    </button>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map(request => (
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
                <TableCell className="p-2">
                  {request.Status === 'Approved' ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      Approved
                    </div>
                  ) : (
                    <button className="bg-red-500 text-white px-2 py-1 w-24 rounded" onClick={() => handleApprove(request.RequestID)}>Pending</button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages).keys()].map(number => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                onClick={() => paginate(number + 1)}
                isActive={currentPage === number + 1}
              >
                {number + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ApproveRequests;
