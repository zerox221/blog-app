const mongoose = require("mongoose");

const additionalInfoSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  },
);

const tempUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  additionalInfo: {
    type: additionalInfoSchema,
    default: () => ({}),
  },
  profile: {
    url: {
      type: String,
    },
    profileId: {
      type: String,
      default: "",
    },
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
  ],
  otp: {
    type: String,
    required: true,
    trim: true,
  },
  expiresIn: {
    type: Date,
    required: true,
  },
});

tempUserSchema.index({ expiresIn: 1 }, { expireAfterSeconds: 60 });

module.exports = mongoose.model("tempUser", tempUserSchema);
