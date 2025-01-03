import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/interfaces/auth.interface";
import { storageHelper } from "@/utils/storage.util";

interface DashboardState {
    user: IUser | null;
    isAuthenticated: boolean;
}

const initialState: DashboardState = {
    user: null,
    isAuthenticated: storageHelper.hasCookieItem(),
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
        setAuthentication: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
    },
});

export const { setUser, setAuthentication } = dashboardSlice.actions;

export default dashboardSlice.reducer;
