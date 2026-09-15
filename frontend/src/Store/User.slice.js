import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : null,
        loading : true,
        error : false,
    },
    reducers : {
        setUser : (state,action)=>{
            state.user = action.payload;
            state.error = false;
        },
        setLoading : (state,action)=>{
            state.loading  = action.payload;
        },
        setError : (state,action)=>{
            state.error  = action.payload;
            state.loading = false;
        }
    }
})

export const {setUser , setLoading , setError} = userSlice.actions;
export default userSlice.reducer;