import express from "express";
import { UserController } from "./controller/user.controller";
import { MessageController } from "./controller/message.controller";

const router = express.Router();
const userController = new UserController();

// User routes
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

const messageController = new MessageController();
// Message routes
router.get("/messages", messageController.getMessages);
router.get("/messages/:id", messageController.getMessageById);
router.post("/messages", messageController.createMessage);
router.put("/messages/:id", messageController.updateMessage);
router.delete("/messages/:id", messageController.deleteMessage);

export default router;
