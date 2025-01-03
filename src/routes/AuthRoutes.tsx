/* eslint-disable react-refresh/only-export-components */
import AuthLayout from "@/layout/AuthLayout";
import { type RouteObject, Navigate } from "react-router-dom";

import Signup from "@/pages/auth/Signup";
import Login from "@/pages/auth/Login";
import NoMatch from "@/pages/NoMatch";


const authRoutes: RouteObject[] = [
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { index: true, path: "", element: <Navigate to="/auth/login" /> },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "sign-up",
                element: <Signup />,
            },
            {
                path: "*",
                element: <NoMatch />,
            },
        ],
    },
];

export default authRoutes;
