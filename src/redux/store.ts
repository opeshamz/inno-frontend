import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slices/dashboardSlice"; // Adjust the path as needed

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
