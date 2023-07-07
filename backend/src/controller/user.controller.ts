import { logger } from "../logger/logger";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";

export class UserController {
  constructor() {}

  public async getUsers(req: Request, res: Response) {
    const userService = new UserService();
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async getUserById(req: Request, res: Response) {
    const userService = new UserService();
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async createUser(req: Request, res: Response) {
    const userService = new UserService();
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      logger.log("error", error.toString());
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async updateUser(req: Request, res: Response) {
    const userService = new UserService();
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(user);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const userService = new UserService();
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
