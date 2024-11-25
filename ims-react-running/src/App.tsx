import { ThemeProvider } from "./contexts/ThemeContext";
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from "react-router-dom"; // Keep this for RouterProvider
import { router } from "./Router"; // Import your router configuration

export default function App() {
    return (
        <ThemeProvider>
            <ChakraProvider>
                {/* Use RouterProvider to pass the router object */}
                <RouterProvider router={router} />
            </ChakraProvider>
        </ThemeProvider>
    );
}