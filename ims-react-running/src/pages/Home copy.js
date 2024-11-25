import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import TotalToolsHomeBoxCard from '../components/TotalToolsHomeBoxCard';
import ToolsInUseHomeBoxCard from '../components/ToolsInUseHomeBoxCard';
import ToolsAvailableHomeBoxCard from '../components/ToolsAvailableHomeBoxCard';
import BarChart from '../components/charts/BarChart';
import HomeTable from '../components/tables/HomeTable';
import MonthlyToolRequestsLineChart from '../components/charts/MonthlyToolRequestsLineChart';
import { Card } from "@/components/ui/card";
export default function Dashboard() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex flex-col md:flex-row md:space-x-4", children: [_jsx("div", { className: "md:w-1/4", children: _jsx(TotalToolsHomeBoxCard, {}) }), _jsx("div", { className: "md:w-1/4", children: _jsx(ToolsInUseHomeBoxCard, {}) }), _jsx("div", { className: "md:w-1/4", children: _jsx(ToolsAvailableHomeBoxCard, {}) })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4", children: [_jsx(Card, { className: "w-full md:w-1/2", children: _jsx(BarChart, {}) }), _jsx(Card, { className: "w-full md:w-1/2", children: _jsx(MonthlyToolRequestsLineChart, {}) })] }), _jsx("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4", children: _jsx(Card, { className: "w-full md:w-1/2", children: _jsx(HomeTable, {}) }) })] }));
}
