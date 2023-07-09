import mongoose, { Types } from "mongoose";
import { IUserData } from "./user.model";

export interface IMessageData {
  user?: Types.ObjectId | IUserData;
  text?: string;
}

const MessageSchema = new mongoose.Schema({
  user: { type: Types.ObjectId, ref: "User" },
  text: String,
});

export const MessageModel = mongoose.model("Message", MessageSchema);
