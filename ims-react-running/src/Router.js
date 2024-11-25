import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "./components/layouts/AppLayout";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Empty from "./pages/Empty";
import Inventory from "./pages/Inventory";
import Batch from "./pages/Batch";
import Location from "./pages/Location";
import AdminDashboard from "./pages/AdminDashboard";
// import CategoryDashboard from "./pages/CategoryCard";
import AddDataDashboard from "./pages/AddDatadashboard";
import ApproveRequests from "./pages/ApproveRequests";
import Sample from "./pages/Sample";
import UserRegister from "./pages/UserRegister";
import Login from "./pages/Login";
import CalibrationsAlerts from "./pages/CalibrationsAlertsPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(Applayout, {}),
        children: [
            {
                path: "",
                element: _jsx(Home, {}),
            },
            {
                path: "sample",
                element: _jsx(Sample, {}),
            },
            {
                path: "empty",
                element: _jsx(Empty, {}),
            },
            {
                path: "inventory",
                element: _jsx(Inventory, {}),
            },
            {
                path: "batch",
                element: _jsx(Batch, {}),
            },
            {
                path: "location",
                element: _jsx(Location, {}),
            },
            {
                path: "adminDashboard",
                element: _jsx(AdminDashboard, {}),
            },
            {
                path: "addDataDashboard",
                element: _jsx(AddDataDashboard, {}),
            },
            {
                path: "approveRequests",
                element: _jsx(ApproveRequests, {}),
            },
            {
                path: "userRegister",
                element: _jsx(UserRegister, {}),
            },
            {
                path: "login",
                element: _jsx(Login, {}),
            },
            {
                path: "calibrationAlerts",
                element: _jsx(CalibrationsAlerts, {}),
            },
        ],
    },
    // {
    //     path: "/admin",
    //     element: <AdminLayout />, 
    //     children: [
    //         {
    //             path: "adminDashboard",
    //             element: <AdminDashboard />,
    //         },
    //         {
    //             path: "approveRequests",
    //             element: <ApproveRequests />,
    //         },
    //     ]
    // },
    {
        path: "*",
        element: _jsx(NoMatch, {}),
    },
], {
    basename: '/inventorymanagement/'
});
