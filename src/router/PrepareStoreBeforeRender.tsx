import useFetch from "@/hooks/useFetch";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setUser } from "@/redux/slices/dashboardSlice";

import Fallback from "./Fallback";
import { IUser } from "@/interfaces/auth.interface";

const PrepareStoreBeforeRender = (props: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.dashboard.user);

    // Refetch user info on app reload
    useFetch<IUser>({
        key: "USER_DATA",
        url: "/user",
        onSuccess: (response) => {
            dispatch(setUser(response));
        },
        enabled: !user,
    });

    return (
        <>
            {!user && <Fallback screen />}
            {!!user && <>{props.children}</>}
        </>
    );
};

export default PrepareStoreBeforeRender;
