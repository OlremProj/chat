import { MessageService } from "../services/message.service";

import { Server } from "socket.io";
import http from "http";
import { logger } from "../logger/logger";
import { UserService } from "../services/user.service";

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
        io.sockets.emit("history-messages", messages);
      } catch (err) {
        io.sockets.emit("error", err);
      }
    });

    socket.on("send-message", async (messageData) => {
      console.log("messageData", messageData);
      try {
        const newMessage = await messageService.createMessage(messageData);
        logger.log(
          "info",
          "> " + messageData.username + ":" + messageData.message
        );
        io.sockets.emit("new-message", newMessage);
      } catch (err) {
        logger.error(err);
        io.sockets.emit("error", err);
      }
    });

    // socket.on("disconnect", () => {
    //   usersArray.map((user, index) => {
    //     if (usersArray[index].socketId === socket.id)
    //       return usersArray.splice(index, 1);
    //   });

    //   logger.log("info", "Users online: " + usersArray.length);

    //   io.sockets.emit("users-connected", usersArray);
    // });
  });
}
