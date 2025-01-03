import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./navbar/Navbar";

const DashboardLayout = () => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);

    const { pathname, search } = useLocation();

    useEffect(() => {
        if (scrollerRef?.current) {
            scrollerRef.current.scrollTo(0, 0);
        }
    }, [pathname, search]);

    return (
        <main ref={scrollerRef} className="bg-gray-50">
            <Navbar />
            <section className="min-h-[calc(100vh_-_60px)]">
                <Outlet />
            </section>
        </main>
    );
};

export default DashboardLayout;
