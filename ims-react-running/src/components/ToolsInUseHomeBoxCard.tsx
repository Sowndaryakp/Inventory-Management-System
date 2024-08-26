import React, { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MdPrecisionManufacturing } from "react-icons/md";

const ToolsInUseHomeBoxCard: React.FC = () => {
    const [tools_in_use, settools_in_use] = useState<number | null>(null);
    const [loading, setLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        fetch('http://172.18.7.27:8000/inventory/analytics')
            .then(response => response.json())
            .then(data => {
                // Assuming data is in the format { "total_tools": 29 }
                settools_in_use(data.tools_in_use);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching total tools:', error);
                setLoading(false);
            });
    }, []);

      // Skeleton loading UI
      if (loading) {
        return (
            <div className="ml-4">
                <Card className='flex items-center w-80 h-24 mt-4 mb-4 mr-4 animate-pulse'>
                    <div className="flex items-center justify-center w-32 h-32">
                        {/* Placeholder for image */}
                        <div className="bg-gray-300 rounded-full h-14 w-16"></div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-base font-bold">IN USE</CardTitle>
                        <CardDescription className="font-bold text-center text-2xl text-gray-500">Loading...</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }


    return (
        <div className="ml-4"> {/* Adding margin to the left of the card */}
            <Card className='flex items-center w-80 h-24 mt-4 mb-4 mr-4 hover:bg-sky-400 hover:text-white hover:scale-105 transition-all cursor-pointer'>
                <div className="flex items-center justify-center w-32 h-32">
                {/* <img width="70" height="100" src="https://img.icons8.com/plasticine/100/used-product.png" alt="used-product"/> */}
                <MdPrecisionManufacturing className="h-14 w-16" />
                </div>
                <CardHeader>
                    <CardTitle className="text-base font-bold">IN USE</CardTitle>
                    <CardDescription className={`font-bold text-center text-2xl ${tools_in_use !== null ? '' : 'text-gray-500'}`}>
                        {tools_in_use !== null ? `${tools_in_use}` : 'Loading...'}
                        </CardDescription>

                </CardHeader>
            </Card>
        </div>
    );
};

export default ToolsInUseHomeBoxCard;
