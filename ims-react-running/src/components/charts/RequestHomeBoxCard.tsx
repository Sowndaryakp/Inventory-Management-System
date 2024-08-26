import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RequestHomeBoxCard: React.FC = () => {
    return (
        <div className="ml-4"> {/* Adding margin to the left of the card */}
            <Card className='flex items-center w-80 h-24 mt-4 mb-4 mr-4'>
                <div className="flex items-center justify-center w-32 h-32">
                <img width="32" height="32" src="https://img.icons8.com/carbon-copy/100/ask-question.png" alt="ask-question"/>
                </div>
                <CardHeader>
                    <CardTitle>Requests</CardTitle>
                    <CardDescription>description</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
};

export default RequestHomeBoxCard;
