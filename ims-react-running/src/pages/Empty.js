import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
export default function Empty() {
    return (_jsxs(_Fragment, { children: [_jsx(PageHeader, { className: "w-full", children: _jsx(PageHeaderHeading, { children: "Empty Page" }) }), _jsx(Card, { children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Card Title" }), _jsx(CardDescription, { children: "Card description." })] }) })] }));
}
