import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) return next("Authentication Error");

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(payload?._id).select(
      "-password -refreshToken"
    );

    if (!user) return next("Unauthorized Access");

    req.user = user;
    next();
  } catch (error) {
    next("Authentication Error");
    console.log(error);
  }
};
