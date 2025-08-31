import { configureStore } from "@reduxjs/toolkit";
import campsSlice from "../features/camps/campsSlice"
import userSlice from "../features/users/userSlice";

export const store = configureStore({
    reducer: {
        camps: campsSlice,
        user: userSlice,
    },
})