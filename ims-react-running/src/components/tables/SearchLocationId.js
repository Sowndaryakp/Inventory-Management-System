import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table } from 'antd';
import { Search } from 'lucide-react';
const SearchLocationId = () => {
    const [locationID, setLocationID] = useState('');
    const [locationDetails, setLocationDetails] = useState(null);
    const [error, setError] = useState('');
    const handleSearch = async () => {
        if (!locationID) {
            setError('Location ID is required');
            return;
        }
        try {
            const response = await axios.get(`http://172.18.7.27:8000/api/locations/${locationID}`);
            setLocationDetails(response.data);
            setError('');
        }
        catch (err) {
            console.error('Error fetching location details:', err);
            setError('Error fetching location details');
            setLocationDetails(null);
        }
    };
    const columns = [
        {
            title: 'Location ID',
            dataIndex: 'LocationID',
            key: 'LocationID',
        },
        {
            title: 'Location Name',
            dataIndex: 'LocationName',
            key: 'LocationName',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
        },
    ];
    return (_jsxs(Card, { className: "w-auto mx-auto", children: [_jsx(CardContent, { className: "w-96 ", children: _jsxs("div", { className: "mt-2 -mb-6 flex items-center", children: [_jsx("label", { htmlFor: "locationID", className: "block text-base font-medium text-gray-700 mr-2", children: "Location_ID" }), _jsxs("div", { className: "relative flex-grow", children: [_jsx("input", { type: "text", id: "locationID", value: locationID, onChange: (e) => setLocationID(e.target.value), className: "mt-1 p-2 border border-gray-300 rounded-md w-full pl-8" }), _jsx(Search, { className: "absolute left-2 top-2/4 transform -translate-y-2/4 text-gray-400" })] }), error && _jsx("p", { className: "text-red-500 mt-2", children: error }), _jsx(Button, { onClick: handleSearch, className: "mt-1 ml-4", children: "Search" })] }) }), _jsx(CardFooter, { children: locationDetails && (_jsx("div", { className: "overflow-x-auto", children: _jsx(Table, { columns: columns, dataSource: [locationDetails], rowKey: "LocationID", bordered: true, 
                        // pagination={false}
                        className: "w-full" }) })) })] }));
};
export default SearchLocationId;
