import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  isFirstTimeLogin: boolean;
  qrCode: {
    url: string;
    color: string;
  }[];
  phoneOtp: number;
  privateAccount: boolean;
  emailOtp: number;
  profileImage: string;
  posts: string[];
  followers: string[];
  following: string[];
  stories: string[];
  saved: string[];
  liked: string[];
  tagged: string[];
  sentFollowRequests: string[];
  recievedFollowRequests: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<User> = new Schema({
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, "User Name is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
    trim: true,
  },
  phoneOtp: {
    type: Number,
    required: [true, "Phone OTP is required"],
    trim: true,
  },
  emailOtp: {
    type: Number,
    required: [true, "Email OTP is required"],
    trim: true,
  },
  qrCode: { type: [Object] },
  isVerified: { type: Boolean, default: false, required: true },
  emailVerified: { type: Boolean, default: false, required: true },
  phoneVerified: { type: Boolean, default: false, required: true },
  isFirstTimeLogin: { type: Boolean, default: true, required: true },
  profileImage: { type: String },
  privateAccount: { type: Boolean, default: false, required: true },
  posts: { type: [String] },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  tagged: { type: [String] },
  sentFollowRequests: { type: [String] },
  recievedFollowRequests: { type: [String] },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;