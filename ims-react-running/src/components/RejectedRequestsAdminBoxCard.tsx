import React, { useEffect, useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FcDisapprove } from "react-icons/fc";

const RejectedRequestsAdminBoxCard: React.FC = () => {
    const [rejected_requests, setrejected_requests] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://172.18.7.27:8000/inventory/analytics')
            .then(response => response.json())
            .then(data => {
                // Assuming data is in the format { "total_tools": 29 }
                setrejected_requests(data.rejected_requests);
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
                <FcDisapprove className="h-14 w-16"/>
                </div>
                <CardHeader>
                    <CardTitle>Rejected Requests:</CardTitle>
                    <CardDescription className={`font-bold text-lg ${rejected_requests !== null ? '' : 'text-gray-500'}`}>
                        {rejected_requests !== null ? `${rejected_requests}` : 'Loading...'}
                        </CardDescription>

                </CardHeader>
            </Card>
        </div>
    );
};

export default RejectedRequestsAdminBoxCard;
