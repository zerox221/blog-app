const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  refreshToken: {
    type: String,
    trim: true,
  },
  ip: {
    type: String,
    required: true,
    trim: true,
  },
  userAgent: {
    type: String,
    required: true,
    trim: true,
  }
},
{timestamps : true}
);
module.exports = mongoose.model("session",sessionSchema);
