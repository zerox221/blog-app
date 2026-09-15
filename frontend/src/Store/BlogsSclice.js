import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    loading: false,
    remainigBlogs: 0,
    error: false,
    searchBlog : "",
    updateBlogLoading : false,
  },
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.error = false;
    
    },
    updateBlog: (state, action) => {
      const newBlogs = action.payload;
      const blogs = state.blogs;
      const finalBlogs = [...blogs,...newBlogs];
      state.blogs = finalBlogs;
      state.updateBlogLoading = false;
      state.error = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRemainingBlogs: (state, action) => {
      state.remainigBlogs = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchBlog : (state,action)=>{
      state.search = action.payload;
    },
    setUpdateBlogLoading : (state,action)=>{
      state.updateBlogLoading = action.payload;
    }
  },
});

export const { setBlogs, updateBlog, setUpdateBlogLoading ,setLoading,setSearchBlog, setRemainingBlogs , setError } =
  blogSlice.actions;
export default blogSlice.reducer;
