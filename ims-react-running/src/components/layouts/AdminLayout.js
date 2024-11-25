import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { Header } from "./Header";
import { Footer } from "./Footer";
export const AdminLayout = () => {
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx("main", { children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }));
};
