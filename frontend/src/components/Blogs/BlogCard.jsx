import api from "@/services/api";
import { Heart } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Like from "./Like";

const BlogCard = ({ blog }) => {
  const date = new Date(blog?.createdAt);

  const year = date.getFullYear();
  const month = date.toLocaleString("en-IN", {
    month: "long",
    timeZone: "Asia/Kolkata",
  });
  const day = date.getDate();
  const navigate = useNavigate();

  const description = blog?.description;
  return (
    <div className="w-full min-h-40 flex flex-col gap-2 shrink-0 border-b border-[#F3F3F3] py-4 ">
      <div className="flex gap-3 text-xs text-[#706C63]">
        <span>{blog?.admin?.name}</span>
        <span>{blog?.category}</span>
        <span>
          {month?.substring(0, 4)} {day}
        </span>
      </div>
      <div onClick={() => navigate(`/dashboard/article/info/${blog?._id}`)}>
        <h2 className="text-xl md:text-2xl font-semibold">{blog?.title}</h2>
        <div>
          <span className="text-[#706C63] text-sm">
            {description?.substring(0, 80)}...
          </span>
        </div>
      </div>

      <div className="text-xs items-center flex justify-between text-[#706C63]">
        <div className="flex gap-2 w-[70%]  flex-wrap">
          {blog?.tags.map((tag, idx) => {
            return (
              <span
                key={idx}
                className="bg-gray-50 px-1 p-1 border-[#DEDBD3] border rounded-md text-black"
              >
                {tag}
              </span>
            );
          })}
        </div>

        <Like blog={blog} />
        {/* like handler */}
      </div>
    </div>
  );
};

export default BlogCard;
