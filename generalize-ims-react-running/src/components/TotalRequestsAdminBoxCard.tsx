import React, { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TotalRequestsAdminBoxCard: React.FC = () => {
    const [total_requests, settotal_requests] = useState<number | null>(null);

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

    return (
        <div className="ml-4"> {/* Adding margin to the left of the card */}
            <Card className='flex items-center w-80 h-24 mt-4 mb-4 mr-4 hover:bg-sky-400 hover:text-white hover:scale-105 transition-all cursor-pointer'>
                <div className="flex items-center justify-center w-32 h-32">
                {/* <img width="70" height="100" src="https://img.icons8.com/plasticine/100/used-product.png" alt="used-product"/> */}
                </div>
                <CardHeader>
                    <CardTitle>Total Requests:</CardTitle>
                    <CardDescription className={`font-bold text-lg ${total_requests !== null ? '' : 'text-gray-500'}`}>
                        {total_requests !== null ? `${total_requests}` : 'Loading...'}
                        </CardDescription>

                </CardHeader>
            </Card>
        </div>
    );
};

export default TotalRequestsAdminBoxCard;
