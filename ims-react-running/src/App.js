import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from "react-router-dom"; // Keep this for RouterProvider
import { router } from "./Router"; // Import your router configuration
export default function App() {
    return (_jsx(ThemeProvider, { children: _jsx(ChakraProvider, { children: _jsx(RouterProvider, { router: router }) }) }));
}
