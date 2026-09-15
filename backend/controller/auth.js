const User = require("../models/user.model");
const TempUser = require("../models/tempUser.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const session = require("../models/session.model");
const sendOtp = require("../services/SendOtp");

require("dotenv").config();

exports.registerController = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "please enter all the fields",
      });
    }
    //checking if the user already exists or not
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exits with this email",
      });
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const hashPassword = await bcrypt.hash(password, 10);
    const saveTempUser = await TempUser.updateOne(
      { email },
      {
        name,
        email,
        password: hashPassword,
        otp,
        expiresIn: Date.now() + 2 * 60 * 1000,
        profile : {
          url : `https://api.dicebear.com/10.x/initials/svg?initialsVariant=alt&lettersVariant=single:1&backgroundColor=000000&seed=${name}`,
        }
      },
      { upsert: true },
    );

    sendOtp({email,otp,name});

    res.status(200).json({
      success: true,
      email: email,
    });

  } catch (error) {
    console.log("error in registration handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.verifyController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "please enter all the fields",
      });
    }

    const user = await TempUser.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid otp",
      });
    }

    if (user.otp === otp) {
      if (user.expiresIn <= Date.now()) {
        return res.status(400).json({
          success: false,
          message: "otp is expired",
        });
      }

      //if otp is correct and not expired save the data in the user collection

      const saveUser = await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
        blogs: user.blogs,
        additionalInfo: user.additionalInfo,
        profile : user.profile,
      });

      await TempUser.findByIdAndDelete(user._id)

      const sessionEntry = await session.create({
        email: saveUser.email,

        ip: req.ip,
        userAgent: req.headers["user-agent"],
      });

      const payload = {
        id: saveUser._id,
        email: saveUser.email,
        sessionId: sessionEntry._id,
      };

      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      const hashRefreshToken = await bcrypt.hash(refreshToken, 10);
      sessionEntry.refreshToken = hashRefreshToken;

      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15min",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "login successfully",
        user: {
          name: saveUser.name,
          email: saveUser.email,
          profile : saveUser.profile,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "otp not matched",
      });
    }
  } catch (error) {
    console.log("internal server error at verify controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "refresh token is not valid",
      });
    }

    const decoded = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const sessionCheck = await session.findById(decoded.sessionId);

    if (!sessionCheck) {
      return res.status(401).json({
        message: "Session expired. Please login again",
      });
    }


    const payload = {
      id: decoded.id,
      email: decoded.email,
       sessionId: decoded.sessionId,
    };

    const newRefreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );
    const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15min",
    });

    res.cookie("refreshToken", newRefreshToken);
    res.cookie("accessToken", newAccessToken);

    return res.status(200).json({
      success: true,
      message: "token refreshed successfully",
    });
  } catch (error) {
    console.log("error in refresh token handler : ", error.message);
    res.status(401).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not exits with this email",
      });
    }
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(401).json({
        success: false,
        message: "invalid email or password",
      });
    }

    const createdSession = await session.create({
      email: user.email,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const payload = {
      id: user._id,
      email: user.email,
      sessionId: createdSession._id,
    };

    const newrefreshToken = await jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );
    const hashRefreshToken = await bcrypt.hash(newrefreshToken, 10);
    createdSession.refreshToken = hashRefreshToken;
    createdSession.save();

    const newaccessToken = await jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" },
    );

    res.cookie("refreshToken", newrefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("accessToken", newaccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        additionalInfo: user.additionalInfo,
        blogs: user.blogs,
      },
    });
  } catch (error) {
    console.log("error in login handler : ", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.logOutController = async (req, res) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "accesstoken not valid",
      });
    }

    const decode = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    if (!decode) {
      return res.status({
        success: false,
        message: "invalid access token",
      });
    }
    await session.findByIdAndDelete(decode.sessionId);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "log out successfully",
    });
  } catch (error) {
    console.log("error in logOut handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal error while loging out",
    });
  }
};

exports.logOutAllController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "invalid refresh token",
      });
    }
    const decoded = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "invalid refresh token",
      });
    }
    await session.deleteMany({ email: decoded.email });

    res.status(200).json({
      success: true,
      message: "successfully log out from all devices",
    });
  } catch (error) {
    console.log(
      "error whil doing in log out from all devices : ",
      error.message,
    );
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
