import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  isFirstTimeLogin: boolean;
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
    match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    unique: true,
    trim: true,
  },
  password: { type: String, required: [true, "Password is required"], minlength: 8, trim: true },
  isVerified: { type: Boolean, default: false, required: true },
  isFirstTimeLogin: { type: Boolean, default: true, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) ||  mongoose.model<User>("User", userSchema);

export default UserModel;