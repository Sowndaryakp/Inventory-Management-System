import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, ShoppingCart } from 'react-feather'; // Importing BarChart2 and ShoppingCart icons from Feather Icons

const BoxCard: React.FC = () => {
    return (
        <div className="ml-4"> {/* Adding margin to the left of the card */}
            <Card className='flex items-center w-80 h-24 mt-4 mb-4 mr-4'>
                <ShoppingCart size={20} className="mr-6" /> {/* Rendering the ShoppingCart icon with size and margin */}
                {/* Alternatively, you can use BarChart2 icon */}
                {/* <BarChart2 size={20} className="mr-2" /> */}
                <CardHeader>
                    <CardTitle>abc</CardTitle>
                    <CardDescription>xyz</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
};

export default BoxCard;
