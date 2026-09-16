import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User.slice"
import userEmail from "./EmailSlice"
import allBlogs from "./BlogsSclice"
import userProfile from "./ProfileSlice";
const store = configureStore({
    reducer : {
            user : userReducer,
            email : userEmail,
            blogs : allBlogs,
            profile : userProfile,
    }
})

export default store;