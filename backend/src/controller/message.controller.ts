import { MessageService } from "@/services/message.service";
import { Request, Response } from "express";

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  public async getMessages(req: Request, res: Response) {
    try {
      const messages = await this.messageService.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async getMessageById(req: Request, res: Response) {
    try {
      const message = await this.messageService.getMessageById(req.params.id);
      if (!message) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(message);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async createMessage(req: Request, res: Response) {
    try {
      const message = await this.messageService.createMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async updateMessage(req: Request, res: Response) {
    try {
      const message = await this.messageService.updateMessage(
        req.params.id,
        req.body
      );
      if (!message) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.json(message);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  public async deleteMessage(req: Request, res: Response) {
    try {
      const message = await this.messageService.deleteMessage(req.params.id);
      if (!message) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
