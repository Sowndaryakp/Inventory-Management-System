import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface RequestCardProps {
  toolID: number;
  toolName: string;
  requestData: any;
  onClose: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ toolID, toolName, requestData, onClose }) => {
  const methods = useForm({
    defaultValues: {
      UserID: requestData.UserID,
      QuantityNeeded: requestData.QuantityNeeded,
      PurposeOfUse: requestData.PurposeOfUse,
      AdditionalComments: requestData.AdditionalComments,
      RequestDate: requestData.RequestDate,
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const currentDate = new Date().toISOString();
      await axios.put(`http://172.18.7.27:8000/tool_requests/${requestData.RequestID}`, {
        ...data,
        ToolID: toolID,
        Status: 'Pending',
        AdminID: 1, // Assuming AdminID is 1, change accordingly
        AdminApprovalDate: currentDate,
      });
      onClose();
    } catch (error) {
      console.error('Error saving request:', error);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Request for {toolName}</CardTitle>
        <CardDescription>Fill out the form to request this tool.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel htmlFor="toolID">Tool ID</FormLabel>
            <FormControl>
              <Input id="toolID" value={toolID} readOnly />
            </FormControl>
          </FormItem>
            <FormItem>
              <FormLabel htmlFor="userID">User ID</FormLabel>
              <FormControl>
                <Input {...methods.register('UserID')} id="userID" />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="quantityNeeded">Quantity Needed</FormLabel>
              <FormControl>
                <Input {...methods.register('QuantityNeeded')} id="quantityNeeded" type="number" />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="purposeOfUse">Purpose of Use</FormLabel>
              <FormControl>
                <Input {...methods.register('PurposeOfUse')} id="purposeOfUse" />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="additionalComments">Additional Comments</FormLabel>
              <FormControl>
                <Input {...methods.register('AdditionalComments')} id="additionalComments" />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="requestDate">Request Date</FormLabel>
              <FormControl>
                <Input {...methods.register('RequestDate')} id="requestDate" readOnly />
              </FormControl>
            </FormItem>
            <CardFooter className="flex justify-between mt-4">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default RequestCard;
