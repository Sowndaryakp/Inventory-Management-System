import { jsx as _jsx } from "react/jsx-runtime";
import Balance from "react-wrap-balancer";
import { cn } from "@/lib/utils";
function PageHeader({ className, children, ...props }) {
    return (_jsx("section", { className: cn("pt-6 pb-4 flex items-center justify-between space-y-2", className), ...props, children: children }));
}
function PageHeaderHeading({ className, ...props }) {
    return (_jsx("h1", { className: cn("text-3xl font-semibold tracking-tight my-1", className), ...props }));
}
function PageHeaderDescription({ className, ...props }) {
    return (_jsx(Balance, { className: cn("max-w-[750px] text-lg text-muted-foreground sm:text-xl", className), ...props }));
}
export { PageHeader, PageHeaderHeading, PageHeaderDescription };
