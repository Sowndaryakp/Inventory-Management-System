import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const CreateTools = () => {
    const [toolData, setToolData] = useState([]); // State to store tool data
    const [status, setStatus] = useState("Available"); // State to manage the selected status
    const methods = useForm({
        defaultValues: {
            ToolName: '',
            QuantityAvailable: 0,
            Location: ''
        }
    });
    const onSubmit = async (data) => {
        try {
            // Add the selected status to the form data
            data.Status = status;
            const response = await axios.post('http://172.18.7.27:8000/tools/', data);
            console.log('Tool created successfully:', response.data);
            // Update tool data after creating a new tool
            setToolData([...toolData, response.data]);
            // Reset form fields
            methods.reset();
        }
        catch (error) {
            console.error('Error creating tool:', error);
            // Handle error response here
        }
    };
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };
    return (_jsxs(Card, { className: "w-[400px] m-auto mt-10", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Create Tool" }), _jsx(CardDescription, { children: "Fill out the form to create a new tool." })] }), _jsx(CardContent, { children: _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(onSubmit), children: [_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "ToolName", children: "Tool Name:" }), _jsx(FormControl, { children: _jsx(Input, { id: "ToolName", ...methods.register('ToolName') }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "QuantityAvailable", children: "Quantity Available:" }), _jsx(FormControl, { children: _jsx(Input, { id: "QuantityAvailable", type: "number", ...methods.register('QuantityAvailable') }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Status:  " }), _jsx(FormControl, { children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", children: status }) }), _jsxs(DropdownMenuContent, { className: "w-40", children: [_jsx(DropdownMenuLabel, { children: "Status" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuCheckboxItem, { checked: status === "Available", onCheckedChange: () => handleStatusChange("Available"), children: "Available" }), _jsx(DropdownMenuCheckboxItem, { checked: status === "In Use", onCheckedChange: () => handleStatusChange("In Use"), children: "In Use" })] })] }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "Location", children: "Location:" }), _jsx(FormControl, { children: _jsx(Input, { id: "Location", ...methods.register('Location') }) })] }), _jsx(CardFooter, { className: "flex justify-end p-4", children: _jsx(Button, { type: "submit", children: "Create Tool" }) })] }) }) })] }));
};
export default CreateTools;
