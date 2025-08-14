import { configureStore } from "@reduxjs/toolkit";
import campsReducer from "../features/camps/campsSlice"

export const store = configureStore({
    reducer: {
        camps: campsReducer,
    },
})