import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const RequestCard = ({ toolID, toolName, requestData, onClose }) => {
    const methods = useForm({
        defaultValues: {
            UserID: requestData.UserID,
            QuantityNeeded: requestData.QuantityNeeded,
            PurposeOfUse: requestData.PurposeOfUse,
            AdditionalComments: requestData.AdditionalComments,
            RequestDate: requestData.RequestDate,
        }
    });
    const onSubmit = async (data) => {
        try {
            const currentDate = new Date().toISOString();
            await axios.put(`http://172.18.7.27:8000/tool_requests/${requestData.RequestID}`, {
                ...data,
                ToolID: toolID,
                Status: 'Pending',
                AdminID: 1,
                AdminApprovalDate: currentDate,
            });
            onClose();
        }
        catch (error) {
            console.error('Error saving request:', error);
        }
    };
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Request for ", toolName] }), _jsx(CardDescription, { children: "Fill out the form to request this tool." })] }), _jsx(CardContent, { children: _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(onSubmit), children: [_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "toolID", children: "Tool ID" }), _jsx(FormControl, { children: _jsx(Input, { id: "toolID", value: toolID, readOnly: true }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "userID", children: "User ID" }), _jsx(FormControl, { children: _jsx(Input, { ...methods.register('UserID'), id: "userID" }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "quantityNeeded", children: "Quantity Needed" }), _jsx(FormControl, { children: _jsx(Input, { ...methods.register('QuantityNeeded'), id: "quantityNeeded", type: "number" }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "purposeOfUse", children: "Purpose of Use" }), _jsx(FormControl, { children: _jsx(Input, { ...methods.register('PurposeOfUse'), id: "purposeOfUse" }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "additionalComments", children: "Additional Comments" }), _jsx(FormControl, { children: _jsx(Input, { ...methods.register('AdditionalComments'), id: "additionalComments" }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "requestDate", children: "Request Date" }), _jsx(FormControl, { children: _jsx(Input, { ...methods.register('RequestDate'), id: "requestDate", readOnly: true }) })] }), _jsxs(CardFooter, { className: "flex justify-between mt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { type: "submit", children: "Submit" })] })] }) }) })] }));
};
export default RequestCard;
