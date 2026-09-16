const Blog = require("../models/blog.model");
const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;
const Comment = require("../models/comment.model");

async function uploadFile(tempFilePath) {
  console.log("tempFilePath : ", tempFilePath);
  try {
    const photo = cloudinary.uploader.upload(tempFilePath, {
      folder: "blogApp",
      resource_type: "auto",
      quality: "auto",
    });
    return photo;
  } catch (error) {
    console.log("error while uploading photo in cloudinary : ", error.message);
  }
}

// content
// category
// content
// description
// poster
// tags
// title
// visibility

exports.createBlogController = async (req, res) => {
  const { id } = req.user;
  try {
    const poster = req.files.poster;
    const { content, description, tags, title, public, category } = req.body;

    console.log("req.body : ", req.body);
    if (!content || !description || !tags || !title || !public || !category) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const tagsArray = JSON.parse(tags);
    const posterUrl = await uploadFile(poster.tempFilePath);
    const newBlog = await Blog.create({
      title,
      coverImage: {
        url: posterUrl.secure_url,
        id: posterUrl.public_id,
      },
      description,
      tags: tagsArray,
      public: public === "public" ? true : false,
      category,
      admin: id,
      content,
    });

    const user = await User.findByIdAndUpdate(id, {
      $push: { blogs: newBlog._id },
    });
    console.log("newBlog : ", newBlog);

    res.status(200).json({
      success: true,
      message: "evenrything is working",
    });
  } catch (error) {
    console.log("error in creating article handler  : ", error);
    res.status(500).json({
      success: false,
      message: "erro while creating blog",
    });
  }
};

exports.updateBlogController = async (req, res) => {
  const { id } = req.user;
  const { blogId } = req.params;
  const poster = req.files.poster || {};
  try {
    if (!blogId) {
      return res.status(400).json({
        success: false,
        message: "blogId is required",
      });
    }
    const updatedData = req.body;
    const blog = await Blog.findOne({ _id: blogId, admin: id });
    if (poster && poster.tempFilePath) {
      cloudinary.uploader.destroy(blog.coverImage.id);
      const posterUrl = await uploadFile(poster.tempFilePath);
      updatedData.coverImage = {
        url: posterUrl.secure_url,
        id: posterUrl.public_id,
      };
    }
    await blog.updateOne(updatedData, { new: true });
    blog.save();
    res.status(200).json({
      success: true,
      message: "article updated",
    });
  } catch (error) {
    console.log("error in updating blog controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.getAllblogs = async (req, res) => {
  const page = req.query.page;
  const sort = req.query.sort;

  console.log("sort : ", sort);

  let sortOption;
  if (sort === "recent") {
    sortOption = { createdAt: -1 };
  } else if (sort === "popular") {
    sortOption = { views : 1 };
  } else {
    return res.status(400).json({
      message: "Invalid sort option",
    });
  }

  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const blog = await Blog.countDocuments({ public: true });

    const allBlogs = await Blog.find({ public: true })
      .sort(sortOption)
      .populate("admin")
      .skip(skip)
      .select("-content")
      .limit(10);

    let remainingBlogs = blog - (skip + limit);
    if (remainingBlogs < 0) {
      remainingBlogs = 0;
    }

    res.status(200).json({
      success: true,
      allBlogs,
      remainingBlogs,
    });
  } catch (error) {
    console.log("error : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  const userId = req.user.id;
  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).json({
      success: false,
      message: "invalid blog id",
    });
  }
  try {
    const blog = await Blog.findByIdAndDelete(blogId);
    
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "blog not exits with this id",
      });
    }
    res.status(200).json({
      success: true,
      message: "deleted",
    });

    cloudinary.uploader.destroy(blog.coverImage.id);

    await User.findByIdAndUpdate(userId, {
      $pull: { blogs: blogId },
    });
    
  } catch (error) {
    console.log("errro while deleting the blog : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.searchBlogs = async (req, res) => {
  try {
    const search = req.query.search;
    console.log("search : ", search);
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { titel: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ],
    }).populate("admin");
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.log("error in search handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.blogInfoController = async (req, res) => {
  const blogId = req.params.id;
  console.log("blog id : ", blogId);
  try {
    const blog = await Blog.findById(blogId)
      .populate("admin")
      .populate("comments");

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "invalid blog id",
      });
    }
    res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    console.log("error in blog information controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.likeBlogController = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "invalid blog id",
      });
    }
    if (blog.likes.includes(userId)) {
      blog.likedByUser = false;
      blog.likes.pull(userId);
      await blog.save();
      return res.status(200).json({
        success: true,
        message: "blog unliked",
        likesCount: blog.likes.length,
        likedByUser: blog.likedByUser,
      });
    }
    blog.likes.push(userId);
    blog.likedByUser = true;
    await blog.save();
    res.status(200).json({
      success: true,
      message: "blog liked",
      likesCount: blog.likes.length,
      likedByUser: blog.likedByUser,
    });
  } catch (error) {
    console.log("error in like blog controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.commentBlogController = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;
  const { comment } = req.body;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "invalid blog id",
      });
    }
    const commnet = await Comment.create({
      user: userId,
      text: comment,
      blog: blogId,
    });
    blog.comments.push(commnet._id);
    await blog.save();
    res.status(200).json({
      success: true,
      message: "comment added",
      comment: commnet,
    });
  } catch (error) {
    console.log("error in comment blog controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.getAllCommentsController = async (req, res) => {
  const blogId = req.params.id;
  try {
    const comments = await Comment.find({ blog: blogId }).populate("user");

    if (!comments) {
      return res.status(400).json({
        success: false,
        message: "no comments found",
      });
    }
    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log("error in get all comments controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.userBlogsController = async (req, res) => {
  const userId = req.user.id;
  try {
    const blogs = await Blog.find({ admin: userId });
    if (!blogs) {
      return res.status(400).json({
        success: false,
        message: "no blogs are their",
      });
    }

    const publicCount = blogs.filter((blog) => {
      return blog.public === true;
    });

    const privateCount = blogs.filter((blog) => {
      return blog.public === false;
    });

    res.status(200).json({
      success: true,
      blogs,
      publicCount,
      privateCount,
      totalBlogs: blogs.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.blogsViewsController = async (req, res) => {
  const blogId = req.params.id;
  console.log("blog id : ", blogId);
  try {
    const blogs = await Blog.findByIdAndUpdate(
      blogId,
      {
        $inc: { views: 1 },
      },
      { returnDocument: "after" },
    );
    if (!blogs) {
      return res.status(500).json({
        success: false,
        message: "blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "views compelted",
      views: blogs.views,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "error while views controller",
    });
  }
};

exports.popularBlogsController = async (req, res) => {
  try {
    const skip = 0;
    const blogs = await Blog.aggregate([
      {
        $addFields: {
          popularityScore: {
            $add: [
              { $multiply: [{ $size: "$likes" }, 5] },
              { $multiply: [{ $size: "$comments" }, 8] },
              "$views",
            ],
          },
        },
      },
      {
        $sort: {
          popularityScore: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: 15,
      },
    ]);

    res.status(200).json({
      success: true,
      message: "fetched successfully",
      blogs,
    });
  } catch (error) {
    console.log("error in popular blog handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

