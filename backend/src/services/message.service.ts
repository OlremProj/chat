import { IUserData, UserModel } from "../model/user.model";
import { IMessageData, MessageModel } from "../model/message.model";
import { Types } from "mongoose";

export class MessageService {
  public async getMessages(): Promise<any> {
    return await MessageModel.find().populate("user");
  }

  public async getMessageById(id: string): Promise<Document | null> {
    return MessageModel.findById(id);
  }

  public async createMessage(data: Record<string, unknown>): Promise<{
    text: string;
    messageId: Types.ObjectId;
    user: IUserData;
  }> {
    const message = new MessageModel(data);
    return (await (await message.save()).populate("user")).toObject();
  }

  public async updateMessage(
    id: string,
    data: Record<string, unknown>
  ): Promise<Document | null> {
    return MessageModel.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteMessage(id: string): Promise<Document | null> {
    return MessageModel.findByIdAndDelete(id);
  }
}
