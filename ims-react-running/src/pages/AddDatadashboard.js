import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card } from '@/components/ui/card'; // Import Card component
import DepartmentCard from '../components/allcards/DepartmentCard';
import CategoryCard from '../components/allcards/CategoryCard';
import ToolCard from '../components/allcards/ToolCard';
const AddDataDashboard = () => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4", children: [_jsx(Card, { className: "w-full md:w-1/2", children: _jsx("div", { className: "overflow-x-auto", children: _jsx(DepartmentCard, {}) }) }), _jsx(Card, { className: "w-full md:w-1/2", children: _jsx("div", { className: "overflow-x-auto", children: _jsx(CategoryCard, {}) }) })] }), _jsx("div", { className: "flex flex-col md:flex-row md:justify-between md:mt-8 space-y-4 md:space-y-0 md:space-x-4", children: _jsx(Card, { className: "w-full md:w-2/4 mt-5", children: _jsx("div", { className: "overflow-x-auto", children: _jsx(ToolCard, {}) }) }) })] }) }));
};
export default AddDataDashboard;
