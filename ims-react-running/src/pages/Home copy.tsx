import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';
import ToolsInUseHomeBoxCard from '../components/ToolsInUseHomeBoxCard';
import ToolsAvailableHomeBoxCard from '../components/ToolsAvailableHomeBoxCard';
import BarChart from '../components/charts/BarChart';
import PiChart from '../components/charts/PiChart';
import HomeTable from '../components/tables/HomeTable';
import LineChart from '../components/charts/LineChart';
import MonthlyToolRequestsLineChart from '../components/charts/MonthlyToolRequestsLineChart';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    return (
        <>
            {/* <PageHeader>
                <PageHeaderHeading>INVENTORY MANAGEMENT SYSTEM</PageHeaderHeading>
            </PageHeader> */}
             <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="md:w-1/4">
                    <TotalToolsHomeBoxCard />
                </div>
                <div className="md:w-1/4">
                    <ToolsInUseHomeBoxCard />
                </div>
                <div className="md:w-1/4">
                    <ToolsAvailableHomeBoxCard />
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
                <Card className="w-full md:w-1/2">
                    <BarChart />
                </Card>
                {/* <Card className="w-full md:w-1/2">
                    <PiChart />
                </Card> */}
                <Card className="w-full md:w-1/2">
                    {/* <LineChart /> */}
                    <MonthlyToolRequestsLineChart />
                </Card>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
                <Card className="w-full md:w-1/2">
                    <HomeTable />
                </Card>
            </div>
            {/* <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
                <Card className="w-full md:w-1/2">
                    <LineChart />
                    <MonthlyToolRequestsLineChart />
                </Card>
            </div> */}
        </>
    )
}
