import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { CiWarning, CiCircleCheck } from "react-icons/ci";
const ToolTable = ({ tools, onRequestClick }) => {
    const getStatusIcon = (status) => {
        if (status === "In Use") {
            return _jsx(CiWarning, { className: "inline-block" });
        }
        else if (status === "Available") {
            return _jsx(CiCircleCheck, { className: "inline-block" });
        }
        return null;
    };
    return (_jsxs(Table, { className: "min-w-full sm:min-w-[600px]", children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-1/6 p-2", children: "ToolName" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "QuantityAvailable" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Status" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Location" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "ToolID" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "LastUpdated" }), _jsx(TableHead, { className: "w-1/6 p-2", children: "Action" })] }) }), _jsx(TableBody, { children: tools.map((tool, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "p-2", children: tool.ToolName }), _jsx(TableCell, { className: "p-2", children: tool.QuantityAvailable }), _jsxs(TableCell, { className: "p-2", children: [getStatusIcon(tool.Status), " ", tool.Status] }), _jsx(TableCell, { className: "p-2", children: tool.Location }), _jsx(TableCell, { className: "p-2", children: tool.ToolID }), _jsx(TableCell, { className: "p-2", children: tool.LastUpdated }), _jsx(TableCell, { className: "p-2", children: _jsx("button", { onClick: () => onRequestClick(tool.ToolID), className: "text-blue-500 hover:underline", children: "Request" }) })] }, index))) })] }));
};
export default ToolTable;
