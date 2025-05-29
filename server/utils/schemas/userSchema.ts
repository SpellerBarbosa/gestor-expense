import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "../interfaces/interfaces";

const userSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
