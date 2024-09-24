import React, { useState } from 'react';
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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const CreateTools: React.FC = () => {
  const [toolData, setToolData] = useState<any[]>([]); // State to store tool data
  const [status, setStatus] = useState<string>("Available"); // State to manage the selected status

  const methods = useForm({
    defaultValues: {
      ToolName: '',
      QuantityAvailable: 0,
      Location: ''
    }
  });

  const onSubmit = async (data: any) => {
    try {
      // Add the selected status to the form data
      data.Status = status;

      const response = await axios.post('http://172.18.7.27:8000/tools/', data);
      console.log('Tool created successfully:', response.data);
      // Update tool data after creating a new tool
      setToolData([...toolData, response.data]);
      // Reset form fields
      methods.reset();
    } catch (error) {
      console.error('Error creating tool:', error);
      // Handle error response here
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <Card className="w-[400px] m-auto mt-10">
      <CardHeader>
        <CardTitle>Create Tool</CardTitle>
        <CardDescription>Fill out the form to create a new tool.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel htmlFor="ToolName">Tool Name:</FormLabel>
              <FormControl>
                <Input id="ToolName" {...methods.register('ToolName')} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="QuantityAvailable">Quantity Available:</FormLabel>
              <FormControl>
                <Input id="QuantityAvailable" type="number" {...methods.register('QuantityAvailable')} />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Status:  </FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{status}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={status === "Available"}
                      onCheckedChange={() => handleStatusChange("Available")}
                    >
                      Available
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={status === "In Use"}
                      onCheckedChange={() => handleStatusChange("In Use")}
                    >
                      In Use
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel htmlFor="Location">Location:</FormLabel>
              <FormControl>
                <Input id="Location" {...methods.register('Location')} />
              </FormControl>
            </FormItem>
            <CardFooter className="flex justify-end p-4">
            {/* <Button className="p-4 mr-4" variant="outline">Cancel </Button> */}
              <Button type="submit">Create Tool</Button>
            </CardFooter>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default CreateTools;
