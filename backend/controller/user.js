const User = require("../models/user.model");

exports.getMeController = async (req, res) => {
  try {
    console.log(req.user);
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "invalid id",
      });
    }
    const user = await User.findById(id).select("-password");

    return res.status(200).json({
      success: true,
      message: "user fetched successfully",
      user,
    });
    
  } catch (error) {
    console.log("error in getme controller : ",error.message);
    res.status(500).json({
        success : false,
        message : "internal server error",
    })
  }
};

