import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';
import ToolsInUseHomeBoxCard from '../components/ToolsInUseHomeBoxCard';
import ToolsAvailableHomeBoxCard from '../components/ToolsAvailableHomeBoxCard';
import HomeTable from '../components/tables/HomeTable';
import ToolTable from '../components/tables/ToolTable';
import MonthlyToolRequestsLineChart from '../components/charts/MonthlyToolRequestsLineChart';
import RequestStatusDistributionChart from '../components/charts/RequestStatusDistributionChart';
import ToolAvailabilityAndUsageChart from '../components/charts/ToolAvailabilityAndUsageChart';
import RequestsByDepartmentChart from '../components/charts/RequestsByDepartmentChart';
import MostRequestedToolsChart from '../components/charts/MostRequestedToolsChart';

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
                    <MonthlyToolRequestsLineChart />
                </Card>
                <Card className="w-full md:w-1/2">
                    <RequestStatusDistributionChart />
                </Card>
                <br></br>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4 ">
                <Card className="w-full md:w-1/2">
                    <ToolAvailabilityAndUsageChart />
                 </Card>
               <Card className="w-full md:w-1/2">
                    {/* <HomeTable /> */}
                    {/* <ToolTable /> */}
                    <div className="overflow-x-auto w-full">
                        <ToolTable />
                    </div>
                </Card>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4">
                <Card className="w-full md:w-1/2 mt-6">
                    <RequestsByDepartmentChart  />
                 </Card>
               <Card className="w-full md:w-1/2">
                    <MostRequestedToolsChart  topN={8}/>
                </Card>
            </div>
        </>
    )
}
