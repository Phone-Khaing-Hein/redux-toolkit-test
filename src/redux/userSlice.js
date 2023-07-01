import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', user);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        return id;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const editUser = createAsyncThunk('users/editUser', async (user) => {
    try {
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        users: [],
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editUser.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
            })
            .addCase(editUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export default userSlice.reducer;