import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk("/auth/signup", async (userData) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    return await res.json(); //contains token + user info
})

export const loginUser = createAsyncThunk("auth/loginUser", async (userData) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    return await res.json();
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        status: "idle",
    },
    reducers: {
        logout: (state) => {
            state.user = null,
            state.token = null,
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
        loadUserFromStorage: (state) => {
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            if (user && token) {
                state.user = JSON.parse(user);
                state.token = token;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("user", JSON.stringify(action.payload.user));
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            })
    }
})

export const { logout, loadUserFromStorage } = userSlice.actions;
export default userSlice.reducer;