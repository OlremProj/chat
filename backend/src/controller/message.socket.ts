import { MessageService } from "../services/message.service";

import { Server } from "socket.io";
import http from "http";
import { logger } from "../logger/logger";
import { UserService } from "../services/user.service";
import { Types } from "mongoose";

export function messagingSocketSystem(
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
) {
  const messageService = new MessageService();
  const userService = new UserService();

  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    socket.on("user-connect", async (userData) => {
      console.log("userData", userData);
      await userService.updateUser(userData.userId, { isConnected: true });
      const connectedUsers = await userService.getConnectedUsers();
      io.sockets.emit("users-connected");

      logger.log("info", "Users online: " + connectedUsers.length);

      try {
        const messages = await messageService.getMessages();
        console.log("messages", messages);
        io.sockets.emit("history-messages", messages);
      } catch (err) {
        io.sockets.emit("error", err);
      }
    });

    socket.on("send-message", async (messageData) => {
      console.log("messageData", messageData);
      try {
        const { userId: user, newMessage: text } = messageData;
        const newMessage = await messageService.createMessage({
          user: new Types.ObjectId(user),
          text,
        });

        logger.log(
          "info",
          "> " + newMessage.user.username + ":" + messageData.message
        );
        io.sockets.emit("new-message", {
          ...newMessage,
          username: newMessage.user.username,
        });
      } catch (err) {
        logger.error(err);
        io.sockets.emit("error", err);
      }
    });

    socket.on("update-message", async (messageData) => {
      console.log("messageData", messageData);
      try {
        const { _id, newMessage: text } = messageData;
        await messageService.updateMessage(_id, {
          text,
        });
      } catch (err) {
        logger.error(err);
        io.sockets.emit("error", err);
      }
    });

    socket.on("custom-disconnect", async (userId) => {
      await userService.updateUser(userId, { isConnected: false });
      const connectedUsers = await userService.getConnectedUsers();

      logger.log("info", "Users online: " + connectedUsers.length);

      io.sockets.emit("users-connected", connectedUsers);
    });
  });
}
