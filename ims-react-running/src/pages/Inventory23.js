import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ToolTable from '../components/tables/ToolTableInventory'; // Import ToolTable component
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';
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
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "p-6", children: _jsx(TotalToolsHomeBoxCard, {}) }), _jsx("div", { className: "overflow-auto max-w-full", children: _jsx(ToolTable, { tools: tools, onRequestClick: handleRequestClick }) })] }));
};
export default Inventory;
