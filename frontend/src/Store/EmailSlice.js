import { createSlice } from "@reduxjs/toolkit";

const email = createSlice({
    name : "email",
    initialState : {
        email : null
    },
    reducers : {
        setEmail : ((state,action)=>{
            state.email = action.payload;
        })
    }
})

export const {setEmail} = email.actions;
export default email.reducer;