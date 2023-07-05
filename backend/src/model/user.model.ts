import mongoose from "mongoose";

export interface IUserData {
  name?: String;
  email?: String;
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export const UserModel = mongoose.model("User", UserSchema);
