import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name : "profile",
    initialState : {
        totalArticles : [],
        privateArticles : [],
        publicArticles : [],
        rating : 3.5,
        loading : false,
        totalNoOfArticles : 0,
    },
    reducers : {
        setTotalArticles : ((state,action)=>{
            console.log("action payload blogs : ",action.payload)
            state.totalArticles = action.payload;
        }),
        setPrivateArticles : ((state,action)=>{
            state.privateArticles = action.payload;
        }),
        setPublicArticles : ((state,action)=>{
            state.publicArticles = action.payload;
        }),
        setRating : ((state,action)=>{
            state.rating = action.payload;
        }),
        setProfileLoading : ((state,action)=>{
            state.loading = action.payload;
        }),
        setTotalNoOfArticles : ((state,action)=>{
            state.totalNoOfArticles = action.payload;
        })
    }

})

export const {setTotalArticles,setPrivateArticles,setTotalNoOfArticles,setPublicArticles,setRating,setProfileLoading} = profileSlice.actions;
export default profileSlice.reducer;