import { fetchBlogs } from "@/api/blogs";
import BlogCard from "@/components/Blogs/BlogCard";
import SearchArticle from "@/components/Blogs/SearchArticle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBlogs,
  setError,
  setRemainingBlogs,
  setLoading,
  updateBlog,
  setUpdateBlogLoading,
} from "@/Store/BlogsSclice";
import NoSearchResults from "@/components/error/NoSearchResults";

const ExploreArticles = () => {
  const { blogs, remainigBlogs, loading, error, updateBlogLoading } =
    useSelector((state) => state.blogs);
  console.log("updated loading : ", updateBlogLoading);
  const [filter, setFilter] = useState("recent");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  async function fetchArticles() {
    if (page === 1) {
      dispatch(setLoading(true));
    } else {
      dispatch(setUpdateBlogLoading(true));
    }
    try {
      const data = await fetchBlogs(page, filter);
      if (page === 1) {
        dispatch(setBlogs(data.allBlogs));
      } else {
        dispatch(updateBlog(data.allBlogs));
      }
      dispatch(setRemainingBlogs(data.remainingBlogs));
    } catch (error) {
      console.log(error.message);
      dispatch(setError(error.message));
      console.log("error while fetching blogs");
    } finally {
      if (page === 1) {
        dispatch(setLoading(false));
      } else {
        dispatch(setUpdateBlogLoading(false));
      }
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [page, filter]);

  console.log("remaining blogs : ", remainigBlogs);
  return (
    <div className="min-h-screen w-full  flex flex-col gap-8 px-3 py-8 md:px-15 md:gap-10 md:py-10">
      <div>
        <h1 className="text-xl font-bold md:text-2xl">Explore articles</h1>
        <span className="text-xs md:text-sm text-[#706C63]">
          short explaination of things worth understanding...
        </span>
      </div>
      {/* search and category  */}
      <div className="flex flex-col gap-4">
        <SearchArticle />
        <div className="flex flex-col w-full items-end">
          {/* <label htmlFor="sort">SORT BY</label> */}
          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
              console.log("sullu : ", e.target.value);
            }}
            className="px-2 outline-none border border-[#DEDBD3] rounded-md  text-xs p-1 "
            name="filters"
            id="filter"
          >
            <option value="recent">recent</option>
            <option value="popular">popular</option>
          </select>
        </div>
      </div>

      {/* search results */}

      <div className="flex md:flex-row flex-col gap-4 flex-wrap">
        {loading && page == 1 ? (
          "loading"
        ) : error ? <p>{"something went wrong"}</p> : blogs.length===0 ? (
          <NoSearchResults />
        ) : (
          blogs?.map((blog,idx) => {
            return <BlogCard key={idx} blog={blog} />;
          })
        )}
      </div>
      {remainigBlogs != 0 && (
        <div
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
          }}
          className="w-full flex justify-center mt-4 text-black font-bold underline"
        >
          <div>{updateBlogLoading ? "loading.." : "Load more.."}</div>
        </div>
      )}
    </div>
  );
};

export default ExploreArticles;
