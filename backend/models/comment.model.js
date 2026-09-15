const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("comment", commentSchema);
