import mongoose from "mongoose";

export interface IMessageData {
  text?: string;
}

const MessageSchema = new mongoose.Schema({
  text: String,
});
export const MessageModel = mongoose.model("Message", MessageSchema);
