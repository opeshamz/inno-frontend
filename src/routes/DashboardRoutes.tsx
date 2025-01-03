/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { type RouteObject, Navigate } from "react-router-dom";

import DashboardLayout from "@/layout/DashboardLayout";
import NoMatch from "@/pages/NoMatch";

const Home = lazy(() => import("@/pages/platform/home"));
const Settings = lazy(() => import("@/pages/platform/settings"));


const dashboardRoutes: RouteObject[] = [
    {
        path: "/platform",
        element: <DashboardLayout />,
        children: [
            {
                path: "",
                element: <Navigate to="/platform/home" />,
                index: true,
            },

            {
                path: "home",
                element: <Home />,
            },
            {
                path: "settings",
                element: <Settings />,
            },

            {
                path: "*",
                element: <NoMatch />,
            },
        ],
    },
];

export default dashboardRoutes;
