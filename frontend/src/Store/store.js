import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User.slice"
import userEmail from "./EmailSlice"
import allBlogs from "./BlogsSclice"
const store = configureStore({
    reducer : {
            user : userReducer,
            email : userEmail,
            blogs : allBlogs,
    }
})

export default store;