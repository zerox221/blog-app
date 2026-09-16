const express = require("express");
const { getMeController } = require("../controller/user");
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  createBlogController,
  updateBlogController,
  userBlogsController,
  getAllCommentsController,
  commentBlogController,
  likeBlogController,
  getAllblogs,
  deleteBlogController,
  searchBlogs,
  blogInfoController,
  blogsViewsController,
  popularBlogsController
} = require("../controller/blog");
const userRouter = express.Router();

userRouter.get("/get/me", authMiddleware, getMeController);
userRouter.post("/create/blog", authMiddleware, createBlogController);
userRouter.put("/update/blog/:blogId", authMiddleware, updateBlogController);
userRouter.get("/get/all/blogs", authMiddleware, getAllblogs);
userRouter.put("/delete/blog/:id", authMiddleware, deleteBlogController);
userRouter.get("/search/blogs", authMiddleware, searchBlogs);
userRouter.get("/blog/information/:id", authMiddleware, blogInfoController);
userRouter.put("/like/blog/:id", authMiddleware, likeBlogController);
userRouter.post("/comment/blog/:id", authMiddleware, commentBlogController);
userRouter.get("/get/comments/:id", authMiddleware, getAllCommentsController);
userRouter.get("/profile/information", authMiddleware, userBlogsController);
userRouter.put("/view/blog/:id",authMiddleware,blogsViewsController);
userRouter.get("/popular/blogs",authMiddleware,popularBlogsController);
module.exports = userRouter;
