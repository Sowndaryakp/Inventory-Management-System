import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ChakraProvider } from '@chakra-ui/react';
import { router } from "./Router";

export default function App() {
    return (
        <ThemeProvider>
             <ChakraProvider>
            <RouterProvider router={router} />
            </ChakraProvider>
        </ThemeProvider>
    )
}
