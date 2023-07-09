import { IUserData, UserModel } from "../model/user.model";

export class UserService {
  public async getUsers(): Promise<Document[]> {
    return UserModel.find();
  }

  public async getConnectedUsers(): Promise<Document[]> {
    return UserModel.find({ isConnected: true });
  }

  public async getUserById(id: string): Promise<IUserData | null> {
    const user = await UserModel.findById(id);

    return user.toObject();
  }

  public async createUser(data: Record<string, unknown>): Promise<IUserData> {
    const user = new UserModel(data);
    return (await user.save()).toObject();
  }

  public async updateUser(
    id: string,
    data: Record<string, unknown>
  ): Promise<Document | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteUser(id: string): Promise<Document | null> {
    return UserModel.findByIdAndDelete(id);
  }
}
