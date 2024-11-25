import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const RequestCard = ({ toolID, toolName, onClose }) => {
    // Your logic for handling form submission goes here
    return (_jsxs(Card, { className: "w-[350px]", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Request for ", toolName] }), _jsx(CardDescription, { children: "Fill out the form to request this tool." })] }), _jsx(CardContent, { children: _jsxs("form", { children: [_jsxs("div", { className: "flex flex-col space-y-1.5", children: [_jsx(Label, { htmlFor: "toolID", children: "Tool ID" }), _jsx(Input, { id: "toolID", value: toolID, readOnly: true })] }), _jsxs("div", { className: "flex flex-col space-y-1.5", children: [_jsx(Label, { htmlFor: "toolName", children: "Tool Name" }), _jsx(Input, { id: "toolName", value: toolName, readOnly: true })] })] }) }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: onClose, children: "Cancel" }), _jsx(Button, { children: "Approve" })] })] }));
};
export default RequestCard;
