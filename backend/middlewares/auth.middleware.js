const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "access token required",
        accessToken: accessToken,
      });
    }
    const decode =  jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log("error : ",error);
    res.status(401).json({
        success : false,
        message : "internal server error",
    })
  }
};
