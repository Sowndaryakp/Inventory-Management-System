import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ToolTable from '../components/tables/ToolTableInventory';
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';
import AddNewToolRequest from '../components/allcards/AddNewToolRequest';
import { Card } from "@/components/ui/card";
const Inventory = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://172.18.7.27:8000/tools');
            setTools(response.data);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleRequestClick = async (toolID) => {
        // Your handleRequestClick logic here
        console.log("tool id");
        console.log("tClicked");
        console.log(toolID);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col md:flex-row md:space-x-4", children: [_jsx("div", { className: "md:w-1/4", children: _jsx(TotalToolsHomeBoxCard, {}) }), _jsx("div", { className: "mb-7", children: _jsx(AddNewToolRequest, {}) })] }), _jsx("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4", children: _jsx(Card, { className: "w-full ", children: _jsx("div", { className: "overflow-x-auto ", children: _jsx(ToolTable, { tools: tools, onRequestClick: handleRequestClick }) }) }) })] }));
};
export default Inventory;
