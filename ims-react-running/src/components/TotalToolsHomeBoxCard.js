import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from 'lucide-react';
const TotalToolsHomeBoxCard = () => {
    const [totalTools, setTotalTools] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading state
    useEffect(() => {
        fetch('http://172.18.7.27:8000/inventory/analytics')
            .then(response => response.json())
            .then(data => {
            // Assuming data is in the format { "total_tools": 29 }
            setTotalTools(data.total_tools);
            setLoading(false); // Set loading to false once data is fetched
        })
            .catch(error => {
            console.error('Error fetching total tools:', error);
            setLoading(false); // Set loading to false on error as well
        });
    }, []);
    // Skeleton loading UI
    if (loading) {
        return (_jsx("div", { className: "ml-4", children: _jsxs(Card, { className: 'flex items-center w-80 h-24 mt-4 mb-4 mr-4 animate-pulse', children: [_jsx("div", { className: "flex items-center justify-center w-32 h-32", children: _jsx("div", { className: "bg-gray-300 rounded-full h-14 w-16" }) }), _jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-base font-bold", children: "TOTAL TOOLS" }), _jsx(CardDescription, { className: "font-bold text-center text-2xl text-gray-500", children: "Loading..." })] })] }) }));
    }
    // Actual content once data is loaded
    return (_jsx("div", { className: "ml-4", children: _jsxs(Card, { className: 'flex items-center w-80 h-24 mt-4 mb-4 mr-4 hover:bg-sky-400 hover:text-white hover:scale-105 transition-all cursor-pointer', children: [_jsx("div", { className: "flex items-center justify-center w-32 h-32", children: _jsx(Wrench, { className: "h-14 w-16" }) }), _jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-base font-bold", children: "TOTAL TOOLS" }), _jsx(CardDescription, { className: `font-bold text-center text-2xl ${totalTools !== null ? '' : 'text-gray-500'}`, children: totalTools !== null ? `${totalTools}` : 'Loading...' })] })] }) }));
};
export default TotalToolsHomeBoxCard;
