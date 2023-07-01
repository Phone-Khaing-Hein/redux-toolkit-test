import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increase: (state, action) => {
            state.count += 1;
        },
        decrease: (state, action) => {
            state.count -= 1;
        }
    }
})

export const { increase, decrease } = countSlice.actions;

export default countSlice.reducer;