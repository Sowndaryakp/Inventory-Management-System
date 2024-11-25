import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
export function Applayout() {
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("div", { className: "flex-grow flex flex-col", children: _jsx("div", { className: "container px-4 md:px-8 flex-grow flex flex-col", children: _jsx(Outlet, {}) }) }), _jsx("div", { className: "container px-4 md:px-8", children: _jsx(Footer, {}) })] }));
}
