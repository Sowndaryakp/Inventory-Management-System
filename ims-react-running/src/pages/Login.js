import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, FormProvider } from 'react-hook-form';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const Login = () => {
    const methods = useForm({
        defaultValues: {
            Email: '',
            Password: '',
        }
    });
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://172.18.7.27:8000/tools/', data);
            console.log('user created successfully:', response.data);
        }
        catch (error) {
            console.error('Error creating tool:', error);
            // Handle error response here
        }
    };
    return (_jsx(Card, { className: "w-[400px] m-auto mt-30 p-3", children: _jsx(CardContent, { children: _jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: methods.handleSubmit(onSubmit), children: [_jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "Email", children: "Email:" }), _jsx(FormControl, { children: _jsx(Input, { id: "Email", ...methods.register('Email') }) })] }), _jsxs(FormItem, { children: [_jsx(FormLabel, { htmlFor: "Password", children: "Password:" }), _jsx(FormControl, { children: _jsx(Input, { id: "Password", type: "password", ...methods.register('Password') }) })] }), _jsxs("div", { className: "flex items-center justify-between my-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-sm text-gray-900", children: "Remember me" })] }), _jsx("div", { className: "text-sm", children: _jsx("a", { href: "#", className: "font-medium text-blue-600 hover:text-blue-500", children: "Forgot your password?" }) })] }), _jsx(CardFooter, { className: "flex justify-between w- p-4", children: _jsx(Button, { type: "submit", children: "Login" }) }), _jsx("div", { className: "mt-6 flex justify-center items-center", children: _jsx("button", { onClick: () => window.location.href = '/register', className: "text-sm text-blue-600 hover:text-blue-500", children: "Don't have an account? Register here" }) })] }) }) }) }));
};
export default Login;
