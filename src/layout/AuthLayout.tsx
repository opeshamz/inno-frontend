import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Fallback from "@/router/Fallback";

const AuthLayout = () => {
    return (
        <main className="global-container">
            <section className="min-h-[100vh] w-full py-6 flex items-center">
                <Suspense fallback={<Fallback />}>
                    <Outlet />
                </Suspense>
            </section>
        </main>
    );
};

export default AuthLayout;
