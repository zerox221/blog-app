const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      url: {
        type: String,
        required: true,
        trim: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    public: {
      type: Boolean,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    likedByUser: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "comment",
        },
      ],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("blog", blogSchema);
