import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AuthenticationGuard = ({
    permission,
    children,
}: {
    permission: "public" | "private";
    children: React.ReactNode;
}) => {
    const isAuthenticated = useSelector(
        (state: RootState) => state.dashboard.isAuthenticated
    );

    return (
        <>
            {permission === "public" ? (
                isAuthenticated ? (
                    <Navigate to={"/platform/home"} />
                ) : (
                    children
                )
            ) : isAuthenticated ? (
                children
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
};

export default AuthenticationGuard;
