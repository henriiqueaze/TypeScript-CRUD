import express from "express";
import dotenv from "dotenv";
import { indexRouter } from "./routers/indexRouter";
import { createCorsMiddleware } from "./config/corsConfig";
dotenv.config();

const server = express();
server.use(express.json());

const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",") || [];
server.use(createCorsMiddleware(allowedOrigins));

indexRouter(server);
server.listen(3000, () => console.log("Server running on port 3000"));