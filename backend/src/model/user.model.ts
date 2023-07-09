import mongoose from "mongoose";

export interface IUserData {
  _id?: string;
  username?: string;
  isConnected?: boolean;
}

const UserSchema = new mongoose.Schema({
  username: String,
  isConnected: { type: Boolean, default: false },
});

export const UserModel = mongoose.model("User", UserSchema);
