import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RequestCardProps {
  toolID: number;
  toolName: string;
  quantityAvailable: number;
  onClose: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ toolID, toolName, quantityAvailable, onClose }) => {
  const [userID, setUserID] = useState<number>();
  const [quantityNeeded, setQuantityNeeded] = useState<number>();
  const [purposeOfUse, setPurposeOfUse] = useState<string>("");
  const [additionalComments, setAdditionalComments] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const handleSubmit = async () => {
    if (quantityNeeded && quantityNeeded > quantityAvailable) {
      setValidationError("Quantity needed exceeds available quantity.");
      return;
    }

    try {
      const currentDate = new Date().toISOString();

      const requestData = {
        UserID: userID,
        ToolID: toolID,
        QuantityNeeded: quantityNeeded,
        PurposeOfUse: purposeOfUse,
        AdditionalComments: additionalComments,
        RequestDate: currentDate,
        Status: "Pending",
        AdminID: 0,
        AdminApprovalDate: currentDate
      };

      // Send POST request to backend API
      const response = await axios.post('http://172.18.7.27:8000/tool_requests', requestData);
      console.log('Response:', response.data);

      onClose(); // Close the RequestCard after successful submission
    } catch (error) {
      console.error('Error submitting request:', error);
      // Handle error if needed
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Request for {toolName}</CardTitle>
        <CardDescription>Tool ID</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="toolID" className="block text-sm font-medium text-gray-700">Tool ID</label>
            <input type="text" id="toolID" value={toolID} className="mt-1 p-2 border border-gray-300 rounded-md w-full" readOnly />
          </div>
          <div className="mb-4">
            <label htmlFor="userID" className="block text-sm font-medium text-gray-700">User ID</label>
            <input type="number" id="userID" value={userID} onChange={(e) => setUserID(Number(e.target.value))} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="quantityNeeded" className="block text-sm font-medium text-gray-700">Quantity Needed</label>
            <input type="number" id="quantityNeeded" value={quantityNeeded} onChange={(e) => setQuantityNeeded(Number(e.target.value))} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            {validationError && <p className="text-red-500">{validationError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="purposeOfUse" className="block text-sm font-medium text-gray-700">Purpose of Use</label>
            <input type="text" id="purposeOfUse" value={purposeOfUse} onChange={(e) => setPurposeOfUse(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700">Additional Comments</label>
            <input type="text" id="additionalComments" value={additionalComments} onChange={(e) => setAdditionalComments(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="requestDate" className="block text-sm font-medium text-gray-700">Request Date</label>
            <input type="text" id="requestDate" value={new Date().toISOString()} className="mt-1 p-2 border border-gray-300 rounded-md w-full" readOnly />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default RequestCard;