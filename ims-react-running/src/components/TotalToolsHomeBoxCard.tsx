import React, { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench } from 'lucide-react';

const TotalToolsHomeBoxCard: React.FC = () => {
    const [totalTools, setTotalTools] = useState<number | null>(null);
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
        return (
            <div className="ml-4">
                <Card className='flex items-center w-80 h-24 mt-4 mb-4 mr-4 animate-pulse'>
                    <div className="flex items-center justify-center w-32 h-32">
                        {/* Placeholder for image */}
                        <div className="bg-gray-300 rounded-full h-14 w-16"></div>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-base font-bold">TOTAL TOOLS</CardTitle>
                        <CardDescription className="font-bold text-center text-2xl text-gray-500">Loading...</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    // Actual content once data is loaded
    return (
        <div className="ml-4">
            <Card className='flex items-center w-80 h-24 mt-4 mb-4 mr-4 hover:bg-sky-400 hover:text-white hover:scale-105 transition-all cursor-pointer'>
                <div className="flex items-center justify-center w-32 h-32">
                    {/* <img src="https://img.icons8.com/clouds/100/hand-tools.png" alt="hand-tools"/> */}
                    <Wrench className="h-14 w-16" />
                </div>
                <CardHeader>
                    <CardTitle className="text-base font-bold">TOTAL TOOLS</CardTitle>
                    <CardDescription className={`font-bold text-center text-2xl ${totalTools !== null ? '' : 'text-gray-500'}`}>
                        {totalTools !== null ? `${totalTools}` : 'Loading...'}
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
};

export default TotalToolsHomeBoxCard;
