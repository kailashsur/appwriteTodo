import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : null,
}
const authSlice = createSlice({
    name : "Auth",
    initialState,
    reducers : {
        login : (state, action)=>{
            state.status = true;
            state.userData = action.payload;
            localStorage.setItem('Auth', JSON.stringify(state))
        },
        logout : (state)=>{
            state.status = false;
            state.userData = null;
            localStorage.setItem('Auth', JSON.stringify(state))
        },
    }
})




export default authSlice.reducer
export const {login, logout} = authSlice.actions