import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from 'react-feather'; // Importing BarChart2 and ShoppingCart icons from Feather Icons
const BoxCard = () => {
    return (_jsxs("div", { className: "ml-4", children: [" ", _jsxs(Card, { className: 'flex items-center w-80 h-24 mt-4 mb-4 mr-4', children: [_jsx(ShoppingCart, { size: 20, className: "mr-6" }), " ", _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "abc" }), _jsx(CardDescription, { children: "xyz" })] })] })] }));
};
export default BoxCard;
