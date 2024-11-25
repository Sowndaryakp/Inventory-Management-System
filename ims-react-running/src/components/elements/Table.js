import { jsx as _jsx } from "react/jsx-runtime";
export const Table = ({ children, className }) => {
    return (_jsx("div", { className: `overflow-auto max-w-full ${className}`, children: _jsx("table", { className: "min-w-full sm:min-w-[600px]", children: children }) }));
};
// TableHeader component
export const TableHeader = ({ children }) => {
    return _jsx("thead", { children: children });
};
// TableBody component
export const TableBody = ({ children }) => {
    return _jsx("tbody", { children: children });
};
// TableRow component
export const TableRow = ({ children }) => {
    return _jsx("tr", { children: children });
};
// TableHead component
export const TableHead = ({ children }) => {
    return _jsx("th", { className: "p-2", children: children });
};
// TableCell component
export const TableCell = ({ children }) => {
    return _jsx("td", { className: "p-2", children: children });
};
