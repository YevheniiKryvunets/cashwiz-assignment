import { Router } from "express";
import { AuditController } from "../controllers/AuditController";
import { authMiddleware } from "../middlewares/authMiddleware";

export const auditRoutes = Router();

auditRoutes.get("/my-logs", authMiddleware, AuditController.getMyLogs);
