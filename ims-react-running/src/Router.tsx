import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import { AdminLayout } from "./components/layouts/AdminLayout";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import Empty from "./pages/Empty";
import Inventory from "./pages/Inventory";
import Batch from "./pages/Batch";
import Location from "./pages/Location";
import AdminDashboard from "./pages/AdminDashboard";
import DepartmentDashboard from "./components/allcards/DepartmentCard";
// import CategoryDashboard from "./pages/CategoryCard";
import AddDataDashboard from "./pages/AddDatadashboard";
import ApproveRequests from "./pages/ApproveRequests";
import CreateTools from "./pages/CreateTools";
import Sample from "./pages/Sample";
import UserRegister from "./pages/UserRegister";
import Login from "./pages/Login";
import CalibrationsAlerts from "./pages/CalibrationsAlertsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "sample",
                element: <Sample />,
            },
            {
                path: "empty",
                element: <Empty />,
            },
            {
                path: "inventory",
                element: <Inventory />,
            },
            {
                path: "batch",
                element: <Batch />,
            },
            {
                path: "location",
                element: <Location />,
            },
            {
                path: "adminDashboard",
                element: <AdminDashboard />,
            },
            {
                path: "addDataDashboard",
                element: <AddDataDashboard />,
            },
            {
                path: "approveRequests",
                element: <ApproveRequests />,
            },
            {
                path: "userRegister",
                element: <UserRegister />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "calibrationAlerts",
                element: <CalibrationsAlerts />,
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
        element: <NoMatch />,
    },
    
], {
    basename: global.basename
})
