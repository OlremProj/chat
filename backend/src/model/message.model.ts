import mongoose, { Types } from "mongoose";
import { UserModel } from "./user.model";

export interface IMessageData {
  text?: string;
}

const MessageSchema = new mongoose.Schema({
  userId: { type: Types.ObjectId, ref: UserModel.name },
  text: String,
});
export const MessageModel = mongoose.model("Message", MessageSchema);
