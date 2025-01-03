/* eslint-disable react/jsx-no-comment-textnodes */
import { Suspense } from "react";
import {
    useRoutes,
    Routes,
    Route,
    Navigate,

} from "react-router-dom";

import authRoutes from "@/routes/AuthRoutes";
import AuthenticationGuard from "./guards/AuthenticationGuard";
import dashboarRoutes from "@/routes/DashboardRoutes";
import Fallback from "./Fallback";
import NoMatch from "@/pages/NoMatch";
import PrepareStoreBeforeRender from "./PrepareStoreBeforeRender";

const AppRouter = () => {
    const AUTH_ROUTES = useRoutes(authRoutes);
    const DASHBOARD_ROUTES = useRoutes(dashboarRoutes);

    return (
        <Suspense fallback={<Fallback screen />}>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" />}></Route>
                <Route
                    path="/auth/*"
                    element={
                        <AuthenticationGuard permission="public">
                            <>{AUTH_ROUTES}</>
                        </AuthenticationGuard>
                    }
                ></Route>
                <Route
                    path="/platform/*"
                    element={
                        <AuthenticationGuard permission="private">
                            <PrepareStoreBeforeRender>
                                {DASHBOARD_ROUTES}
                            </PrepareStoreBeforeRender>
                        </AuthenticationGuard>
                    }
                ></Route>
                <Route path="*" element={<NoMatch />}></Route>
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
