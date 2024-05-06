import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoosePaginate from "mongoose-paginate-v2";
import validator from "validator";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: [true, "Email address already in use"],
      validate: validator.isEmail,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [true, "Password must be greater than 6 charcters"],
    },
    fullName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      index: true,
    },
    hasNotifications: {
      type: Boolean,
      default: false,
    },
    city: String,
    phone: String,
    refreshToken: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  // Return if the password is not modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

UserSchema.plugin(mongoosePaginate);

export const User = model("User", UserSchema);
