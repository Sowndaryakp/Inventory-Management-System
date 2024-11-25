import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import LocationTable from '../components/tables/LocationTable';
import ToolsLocationTable from '../components/tables/ToolsLocationTable';
import AddNewLocationTools from '../components/allcards/AddNewLocationTools';
import AddNewToolLocations from '../components/allcards/AddNewToolLocations';
import { Card } from "@/components/ui/card";
const Location = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get('url');
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
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "p-3", children: _jsxs("div", { className: "flex flex-col md:flex-row md:space-x-4", children: [_jsx("div", { children: _jsx(AddNewLocationTools, {}) }), _jsx("div", { children: _jsx(AddNewToolLocations, {}) })] }) }), _jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4", children: [_jsx(Card, { className: "w-full md:w-2/4", children: _jsx("div", { className: "overflow-x-auto", children: _jsx(LocationTable, { tools: tools, onRequestClick: handleRequestClick }) }) }), _jsx(Card, { className: "w-full md:w-1/2", children: _jsx(ToolsLocationTable, { tools: tools, onRequestClick: handleRequestClick }) })] })] }));
};
export default Location;
