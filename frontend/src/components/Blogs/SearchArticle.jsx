import { fetchBlogs, searchBlogs } from "@/api/blogs";
import { setBlogs ,setError, setSearchBlog , setLoading, setRemainingBlogs} from "@/Store/BlogsSclice";


import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchArticle = () => {
  const [search, setSearch] = useState("");
  const {error} = useSelector((state)=>state.blogs)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!search.trim()) {
      return;
    }
    const timer = setTimeout(async () => {
      dispatch(setLoading(true))
      try {
        const data = await searchBlogs(search);
        dispatch(setSearchBlog(search));
        dispatch(setBlogs(data.blogs));
        if(data.blogs.length==0){
          dispatch(setRemainingBlogs(0))
          console.log("error : ",error)
        }
        console.log("calling api");
      } catch (error) {
        console.log("error hello : ");
      }finally{
        dispatch(setLoading(false))
      }
    }, 2000);

    return () => {
      console.log("clearing timer");
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className=" relative">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="search topics..."
        type="text"
        className="p-3 pl-10 border border-[#DEDBD3] w-full outline-none placeholder-[#706C63]"
      />
      <span className="absolute top-0 left-2 h-full flex justify-center items-center">
        <Search className="text-[#706C63]" size={20} />
      </span>
    </div>
  );
};

export default SearchArticle;
