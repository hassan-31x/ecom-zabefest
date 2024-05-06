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
      minlength: [true, "Password must be greater than 6 characters"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
    cnicNumber: {
      type: String,
      required: [true, "CNIC number is required"],
    },
    bankAccountNumber: {
      type: String,
      required: [true, "Bank account number is required"],
    },
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
