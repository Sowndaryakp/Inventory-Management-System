import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { appConfig } from "@/config/app";
export function Logo() {
    return (_jsxs(_Fragment, { children: [_jsx("img", { src: "../src/assets/images/cmti.png", className: "h-14 w-24" }), _jsx("span", { className: "font-bold", children: appConfig.name })] }));
}
