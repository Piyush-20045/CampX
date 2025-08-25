import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const token = localStorage.getItem("token");
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
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    return await response.json();
})
// Update a camp
export const updateCamp = createAsyncThunk("/camps/updateCamp", async ({ id, formData }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/camps/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    return await response.json();

})
// Delete logic
export const deleteCamp = createAsyncThunk("camps/deleteCamp", async (id) => {
    const confirm = window.confirm("Do you want to delete this camp post?");
    if (!confirm) return;
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/camps/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    })
});
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
            })
            .addCase(updateCamp.fulfilled, (state, action) => {
                const updatedCamp = action.payload;
                const index = state.data.findIndex(c => c._id === updatedCamp._id);
                if (index !== -1) {
                    state.data[index] = updatedCamp; // Replace the old one
                }
            })
    }
});

export default campsSlice.reducer;