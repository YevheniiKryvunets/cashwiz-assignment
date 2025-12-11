import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const userRoutes = Router();

userRoutes.get("/me", authMiddleware, UserController.me);
