import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';
import ToolsInUseHomeBoxCard from '../components/ToolsInUseHomeBoxCard';
import ToolsAvailableHomeBoxCard from '../components/ToolsAvailableHomeBoxCard';
import ToolTable from '../components/tables/ToolTable';
import MonthlyToolRequestsLineChart from '../components/charts/MonthlyToolRequestsLineChart';
import RequestStatusDistributionChart from '../components/charts/RequestStatusDistributionChart';
import ToolAvailabilityAndUsageChart from '../components/charts/ToolAvailabilityAndUsageChart';
import RequestsByDepartmentChart from '../components/charts/RequestsByDepartmentChart';
import MostRequestedToolsChart from '../components/charts/MostRequestedToolsChart';
import { Card } from "@/components/ui/card";
export default function Dashboard() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col md:flex-row md:space-x-4", children: [_jsx("div", { className: "md:w-1/4", children: _jsx(TotalToolsHomeBoxCard, {}) }), _jsx("div", { className: "md:w-1/4", children: _jsx(ToolsInUseHomeBoxCard, {}) }), _jsx("div", { className: "md:w-1/4", children: _jsx(ToolsAvailableHomeBoxCard, {}) })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4", children: [_jsx(Card, { className: "w-full md:w-1/2", children: _jsx(MonthlyToolRequestsLineChart, {}) }), _jsx(Card, { className: "w-full md:w-1/2", children: _jsx(RequestStatusDistributionChart, {}) }), _jsx("br", {})] }), _jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4 ", children: [_jsx(Card, { className: "w-full md:w-1/2", children: _jsx(ToolAvailabilityAndUsageChart, {}) }), _jsx(Card, { className: "w-full md:w-1/2", children: _jsx("div", { className: "overflow-x-auto w-full", children: _jsx(ToolTable, {}) }) })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4", children: [_jsx(Card, { className: "w-full md:w-1/2 mt-6", children: _jsx(RequestsByDepartmentChart, {}) }), _jsx(Card, { className: "w-full md:w-1/2", children: _jsx(MostRequestedToolsChart, { topN: 8 }) })] })] }));
}
