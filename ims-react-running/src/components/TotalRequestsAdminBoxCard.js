import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const TotalRequestsAdminBoxCard = () => {
    const [total_requests, settotal_requests] = useState(null);
    useEffect(() => {
        fetch('http://172.18.7.27:8000/inventory/analytics')
            .then(response => response.json())
            .then(data => {
            // Assuming data is in the format { "total_tools": 29 }
            settotal_requests(data.total_requests);
        })
            .catch(error => {
            console.error('Error fetching total tools:', error);
        });
    }, []);
    return (_jsxs("div", { className: "ml-4", children: [" ", _jsxs(Card, { className: 'flex items-center w-80 h-24 mt-4 mb-4 mr-4 hover:bg-sky-400 hover:text-white hover:scale-105 transition-all cursor-pointer', children: [_jsx("div", { className: "flex items-center justify-center w-32 h-32" }), _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Total Requests:" }), _jsx(CardDescription, { className: `font-bold text-lg ${total_requests !== null ? '' : 'text-gray-500'}`, children: total_requests !== null ? `${total_requests}` : 'Loading...' })] })] })] }));
};
export default TotalRequestsAdminBoxCard;
