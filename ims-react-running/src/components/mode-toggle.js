import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/useTheme";
export function ModeToggle() {
    const { setTheme } = useTheme();
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "w-9 px-0", children: [_jsx(SunIcon, { className: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), _jsx(MoonIcon, { className: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }), _jsx("span", { className: "sr-only", children: "Toggle theme" })] }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { className: "cursor-pointer", onClick: () => setTheme("light"), children: "Light" }), _jsx(DropdownMenuItem, { className: "cursor-pointer", onClick: () => setTheme("dark"), children: "Dark" }), _jsx(DropdownMenuItem, { className: "cursor-pointer", onClick: () => setTheme("system"), children: "System" })] })] }));
}
