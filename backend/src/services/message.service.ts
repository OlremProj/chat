import { IUserData } from "../model/user.model";
import { MessageModel } from "../model/message.model";
import { Types } from "mongoose";
import { logger } from "../logger/logger";

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

  public async updateMessage(data: Record<string, unknown>): Promise<any> {
    const user = new Types.ObjectId((data.user as any)._id);

    const message = new MessageModel({
      ...data,
      user,
    });

    return await MessageModel.updateOne({ _id: message._id }, message);
  }

  public async deleteMessage(id: string): Promise<Document | null> {
    return MessageModel.findByIdAndDelete(id);
  }
}
