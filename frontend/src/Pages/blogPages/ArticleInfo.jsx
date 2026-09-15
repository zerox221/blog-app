import api from "@/services/api";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { MessageSquare } from "lucide-react";
import Comments from "./Comments";
import { AnimatePresence, motion } from "framer-motion";
import Like from "@/components/Blogs/Like";

const ArticleInfo = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [likeCount, setLikeCount] = useState(null);

  const { id } = useParams();
  console.log("id = ", id);

  useEffect(() => {
    async function views() {
      try {
        const response = await api.put(`/api/v1/user/view/blog/${id}`);
      } catch (error) {
        console.log("error in view handler");
        console.log(error.message);
      }
    }
    views();
  }, []);

  useEffect(() => {
    if (loading) return;
    async function fetchInfo() {
      setLoading(true);
      try {
        const response = await api.get(`/api/v1/user/blog/information/${id}`);
        console.log(response);
        setArticle(response?.data?.blog);
      } catch (error) {
        console.log("error : ", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchInfo();
    setLikeCount(article?.likes?.length || 0);
  }, [id]);

  async function fetchComments() {
    try {
      const response = await api.get(`/api/v1/user/get/comments/${id}`);
      console.log("comments response : ", response);
      setComments(response?.data?.comments || []);
    } catch (error) {
      console.log("error in fetching comments : ", error.message);
    }
  }
  useEffect(() => {
    fetchComments();
  }, [id]);

  async function addcommentHandler(commentText) {
    try {
      const response = await api.post(`/api/v1/user/comment/blog/${id}`, {
        comment: commentText,
      });
      console.log("response : ", response);
      setComments([...comments, response?.data?.comment]);
      setCommentText("");
    } catch (error) {
      console.log("error in adding comment : ", error.message);
    }
  }

  return (
    <>
      {loading ? (
        "loading....."
      ) : (
        <div className="min-h-screen w-full   flex flex-col gap-8 px-3 py-8 md:px-15 md:gap-10 md:py-10">
          <div className="bg-[#F6F5F1] px-2 p-1 w-fit rounded-md text-xs md:text-sm text-[#706C63] uppercase font-semibold">
            {article?.category}
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-semibold capitalize">
              {article?.title}
            </h2>
            <span className=" md:text-xl text-[#706C63] ">
              {article?.description}
            </span>
          </div>

          {/* profile information admin information */}
          <div className="flex w-full md:flex-row flex-col gap-15 justify-between">
            <div className="w-full">
              <div className="p-2 py-3 w-full flex flex-wrap justify-between items-center  rounded-md">
                <div className="flex gap-2 items-center">
                  <div className="md:h-15 shrink-0 bg-red-300 h-10 w-10 md:w-15 rounded-md overflow-hidden">
                    <img
                      src="https://api.dicebear.com/10.x/initials/svg?initialsVariant=alt&lettersVariant=single:1&backgroundColor=000000&seed=balam chauhan"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-sm">Balam chauhan</span>
                    <span className="text-xs">Oct 24</span>
                  </div>
                </div>
                <div
                  onClick={() => setShowComment(!showComment)}
                  className="flex gap-2 relative cursor-pointer justify-end "
                >
                  <MessageSquare className="text-black" />
                  <span className="text-sm absolute -top-1 -right-1 bg-blue-500 text-white rounded-full h-4 w-4 flex items-center justify-center">
                    {comments?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* poster image of artcile */}
            <div className="h-60 md:w-60 shrink-0 rounded-md p-2 bg-[#F6F5F1]">
              <img
                className="h-full w-full object-contain rounded-md"
                src={article?.coverImage?.url}
                alt=""
              />
            </div>
          </div>

          <div className="text-sm">{article && parse(article?.content)}</div>
          <AnimatePresence>
            {showComment && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full  fixed bottom-0 left-0  bg-white p-2 gap-8 py-8 flex flex-col"
              >
                <div className="flex justify-between items-center px-2">
                  <h2 className="text-lg font-semibold">Comments</h2>
                  <div
                    onClick={() => setShowComment(!showComment)}
                    className="flex gap-2 justify-end "
                  >
                    <X className="text-black" />
                  </div>
                </div>
                <AnimatePresence>
                  {showComment && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="h-60 py-3  transition-all ease-in-out p-2  w-full"
                    >
                      <div className=" flex h-80 flex-col gap-3 overflow-y-scroll bar py-2 w-full ">
                        {comments.length === 0 ? (
                          <p className="text-center text-gray-500">
                            No comments yet.
                          </p>
                        ) : (
                          comments?.map((comment, idx) => {
                            return <Comments key={idx} comment={comment} />;
                          })
                        )}
                      </div>
                      <div className="h-[20%] mt-4 flex items-center">
                        <div className="relative rounded-md overflow-hidden w-full">
                          <input
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addcommentHandler(commentText);
                              }
                            }}
                            type="text"
                            className="p-2 w-full rounded-md border border-gray-300 "
                            placeholder="Enter comment"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default ArticleInfo;
