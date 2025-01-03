import { useState, useEffect } from "react";

const useIsMobile = (): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleResize = (): void => {
                const screenWidth: number = window.innerWidth;
                setIsMobile(screenWidth < 500); // Adjust the threshold as needed
            };

            // Initial check
            handleResize();

            // Add event listener for resize
            window.addEventListener("resize", handleResize);

            // Cleanup
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    return isMobile;
};

export default useIsMobile;
