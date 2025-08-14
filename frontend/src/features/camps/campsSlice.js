import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Fetch all camps
export const fetchCamps = createAsyncThunk("/camps/fetchCamps", async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/camps`);
    const data = await response.json();
    return data;
})
// Create a new camp
export const createCamp = createAsyncThunk("/camps/createCamp", async (formData) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/camps`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    return await response.json();
})
const campsSlice = createSlice({
    name: 'camps',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {}, // If we need sync actions later
    extraReducers: (builder) => {
        builder
            .addCase(fetchCamps.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCamps.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchCamps.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCamp.fulfilled, (state, action) => {
                state.data.push(action.payload); // Add new camp to state
            });
    }
});

export default campsSlice.reducer;