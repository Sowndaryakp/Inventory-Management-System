import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useEffect, useState } from "react";
const initialState = {
    theme: "system",
    setTheme: () => null,
};
export const ThemeProviderContext = createContext(initialState);
export function ThemeProvider({ children, defaultTheme = "light", storageKey = "ui-theme", ...props }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) ?? defaultTheme);
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
            root.classList.add(systemTheme);
            return;
        }
        root.classList.add(theme);
    }, [theme]);
    return (_jsx(ThemeProviderContext.Provider, { ...props, value: {
            theme,
            setTheme: (theme) => {
                localStorage.setItem(storageKey, theme);
                setTheme(theme);
            },
        }, children: children }));
}