import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RequestCardProps {
  toolID: number;
  toolName: string;
  onClose: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ toolID, toolName, onClose }) => {
  // Your logic for handling form submission goes here

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Request for {toolName}</CardTitle>
        <CardDescription>Fill out the form to request this tool.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="toolID">Tool ID</Label>
            <Input id="toolID" value={toolID} readOnly />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="toolName">Tool Name</Label>
            <Input id="toolName" value={toolName} readOnly />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button>Approve</Button>
      </CardFooter>
    </Card>
  );
};

export default RequestCard;
