import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userschema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    eMail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      default: null,
      index: true,
    },
    avatar: {
      type: String, //cloudinary
      required: true,
    },
    coverImage: {
      type: String, //cloudinary
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: { type: String, required: [true, "password is required"] },
    refreshToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
//step 1: passoword ko protect karne ke liye bcrypt karna automatically before the data save into database
userschema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userschema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare("password", this.password);
};

userschema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      eMail: this.eMail,
      userName: this.userName,
      lastNameName: this.lastName,
      password: this.password,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userschema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Users = mongoose.model("Userlogin", userschema);
