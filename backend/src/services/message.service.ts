import { IMessageData, MessageModel } from "@/model/message.model";

export class MessageService {
  public async getMessages(): Promise<Document[]> {
    return MessageModel.find();
  }

  public async getMessageById(id: string): Promise<Document | null> {
    return MessageModel.findById(id);
  }

  public async createMessage(
    data: Record<string, unknown>
  ): Promise<IMessageData> {
    const message = new MessageModel(data);
    await message.save();
    return message;
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
