import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// signup fn
export const signUp = createAsyncThunk("/auth/signup", async (userData) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    return await res.json(); //contains token + user info
})

// login fn
export const loginUser = createAsyncThunk("auth/loginUser", async (userData) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    })
    return await res.json();
})

// user name update fn
export const updateName = createAsyncThunk("auth/updateName", async (newName) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update-name`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ newName }),
    })
    return await res.json();
})

// password update fn
export const updatePassword = createAsyncThunk("auth/updatePassword", async (passwords) => {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-password`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(passwords),
        }
    );
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
    }
    return data;
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
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem("user", JSON.stringify(state.user))
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
                localStorage.setItem("token", action.payload.token);
            })
    }
})

export const { logout, loadUserFromStorage, updateUser } = userSlice.actions;
export default userSlice.reducer;