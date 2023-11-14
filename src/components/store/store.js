import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import todoSlice from "./features/todoSlice";

const store = configureStore({
    reducer : {
        auth : authSlice,
        todo : todoSlice,
    }
})

export default store