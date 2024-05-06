import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password, name,cnicNumber,bankAccountNumber,phoneNumber } = req.body;
    if (password.includes(" "))
      return next("Password must not contain any white spaces");

    const userExists = await User.findOne({ email });
    if (userExists) return next("Email already in use");

    const user = await User.create({
      email,
      password,
      name,
      cnicNumber,
      bankAccountNumber,
      phoneNumber,
    });
    if (!user) return next("Failed to create an account");

    const userData = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res.status(201).json({
      success: true,
      message: "Account created",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to generate tokens");
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) return next("Email is required");
    if (!password) return next("Password is required");

    const userData = await User.findOne({ email });
    if (!userData) return next("Invalid credentials");

    const isPassCorrect = await userData.comparePassword(password);
    if (!isPassCorrect) return next("Invalid credentials");

    const { accessToken, refreshToken } = await generateTokens(userData._id);

    const user = await User.findById(userData._id).select(
      "-password -refreshToken"
    );

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Login success",
        data: { user, accessToken, refreshToken },
      });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    // Find user and reset the refreshToken in db
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      { new: true }
    );

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logged out successfully",
        data: {},
      });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return next("Unauthorized Access");

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id);
    if (!user) return next("Invalid Token");

    const { accessToken, refreshToken } = await generateTokens(user._id);

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access token refreshed",
        data: { accessToken, refreshToken },
      });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User fetched",
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
