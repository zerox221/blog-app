import BlogCard from "@/components/Blogs/BlogCard";
import PopularBlog from "@/components/Blogs/PopularBlog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { motion } from "framer-motion";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const { blogs } = useSelector((state) => state.blogs);
  console.log("blogs : ", blogs);
  const [popularBlogs, setPopularBlogs] = useState([]);

  useEffect(() => {
    async function fetchPopularBlogs() {
      try {
        const response = await api.get("/api/v1/user/popular/blogs");
        setPopularBlogs(response.data.blogs);
      } catch (error) {
        console.log("error");
      }
    }
    fetchPopularBlogs();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full relative  flex flex-col gap-8 px-3 py-8 md:px-15 md:gap-20 md:py-10">
      <motion.div
        animate={{
          x: 25,
          y: 10,
        }}
        transition={{
          ease: "linear",
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute h-40 w-50 md:h-80 md:w-80 rounded-full  bg-blue-500 right-5 md:right-20 blur-3xl  -z-20"
      ></motion.div>
      <div className="flex flex-col gap-3 md:gap-5 items-center justify-center w-full ">
        <div className="text-2xl md:text-5xl font-semibold md:font-bold uppercase text-center ">
          <h1>Learn something.</h1>
          <h1>Explain it simply.</h1>
        </div>
        <span className="text-[#706C63] font-normal text-sm md:text-lg text-center">
          Conise is a place to share what you learn through shorts, detailed
          articles that are easy to understand.
        </span>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full md:w-fit  justify-center">
          <Button
            onClick={() => navigate("create/article")}
            className="rounded-none w-full md:h-12 py-5"
          >
            Write Articles
          </Button>
          <Button
            onClick={() => navigate("explore/article")}
            variant="outline"
            className="rounded-none w-full md:h-12 py-5"
          >
            Explore Articles
          </Button>
        </div>
      </div>

      {/* for articals */}
      {/* <div className="flex flex-col gap-5">
        <div className="w-full border-b border-[#F3F3F3]">
          <h1 className="text-xl md:text-2xl font-semibold">Latest Articles</h1>
        </div>
        <div className="flex md:flex-row flex-col gap-3 flex-wrap">
          {blogs?.map((blog, idx) => {
            return <BlogCard key={idx} blog={blog} />;
          })}
        </div>
      </div> */}

      {/* popular articals  */}
      <div className="flex flex-col gap-5 mt-5">
        <div className="w-full border-b border-[#F3F3F3]">
          <h1 className="text-sm md:text-xl  uppercase font-bold">Popular</h1>
        </div>
        <div className="flex md:flex-row flex-col gap-3 flex-wrap">
          {popularBlogs?.map((blog, idx) => {
            return <BlogCard blog={blog} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
