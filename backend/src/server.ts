import express from "express";
import { json } from "body-parser";
import dotenv from "dotenv";
import { logger } from "./logger/logger";
import mongoose from "mongoose";

dotenv.config();

// Mongoose setup
mongoose.connect(process.env.DB_URI || "mongodb://db:27017/chat");

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(json());

// Middleware to log all requests
app.use((req, res, next) => {
  logger.info(`[${req.method}] ${req.url}`);
  next();
});

app.listen(port, () => {
  logger.log("info", `server listening on port: ${port}`);
});
