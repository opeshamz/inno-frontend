/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useURLQuery = <T extends Record<string, string>>(
    effectFn?: (data: T) => void
) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = useMemo(() => {
        const url = new URLSearchParams(location.search);
        // convert url to object
        const q = Array.from(url.keys()).reduce<T>((acc, cur) => {
            return { ...acc, [cur]: url.get(cur) };
        }, {} as T);
        return q;
    }, [location]);

    useEffect(() => {
        effectFn?.(query);
    }, [location, query]);

    return {
        value: query as Partial<T>,
        setURLQuery: (
            queries: Partial<T>, // Record<string, string | null>,
            clearAll: boolean = false
        ) => {
            const url = new URLSearchParams(clearAll ? "" : location.search);
            Object.keys(queries).forEach((key) => {
                const value = queries[key];
                if (value !== null) {
                    url.set(key, String(value));
                } else if (url.has(key)) {
                    url.delete(key);
                }
            });
            navigate(`${location.pathname}?${url.toString()}`, {
                replace: true,
            });
        },
    };
};
