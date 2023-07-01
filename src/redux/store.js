import { configureStore } from "@reduxjs/toolkit";
import countReducer from './countSlice';
import userReducer from './userSlice';


const store = configureStore({
    reducer: {
        count: countReducer,
        user: userReducer
    }
})

export default store;