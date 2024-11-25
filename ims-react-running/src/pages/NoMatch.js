import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { buttonVariants } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
export default function NoMatch() {
    return (_jsx("div", { className: "bg-background text-foreground flex-grow flex items-center justify-center", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-8xl mb-4", children: "404" }), _jsx("h1", { className: "text-3xl font-semibold", children: "Oops! Page not found" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "We are sorry, but the page you requested was not found" }), _jsx(NavLink, { to: "/", className: buttonVariants(), children: "Back to Home" })] }) }));
}
