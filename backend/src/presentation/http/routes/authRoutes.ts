import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
