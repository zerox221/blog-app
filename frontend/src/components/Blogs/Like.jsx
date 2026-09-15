import React from "react";
import { useState } from "react";
import { Heart } from "lucide-react";
import api from "@/services/api";
const Like = ({ blog }) => {
  const [likeCount, setLikeCount] = useState(blog?.likes?.length || 0);
  const [likedByUser, setLikedByUser] = useState(blog?.likedByUser || false);

  async function likeHandler() {
    console.log("function calling for like blog");
    try {
      const response = await api.put(`/api/v1/user/like/blog/${blog?._id}`);
      setLikeCount((prev) => prev + 1);
      setLikedByUser(response?.data?.likedByUser || false);
      setLikeCount(response?.data?.likesCount);
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  }

  return (
    <div
      onClick={likeHandler}
      className="flex items-center gap-1 cursor-pointer select-none"
    >
      <Heart
        size={18}
        strokeWidth={2}
        className={`transition-all duration-200 ${
          likedByUser
            ? "text-red-500 scale-125"
            : "text-gray-500 scale-100 hover:scale-110"
        }`}
        fill={likedByUser ? "currentColor" : "none"}
      />

      <span
        className={`transition-colors duration-200 ${
          likedByUser ? "text-red-500" : "text-gray-500"
        }`}
      >
        {likeCount}
      </span>
    </div>
  );
};

export default Like;
