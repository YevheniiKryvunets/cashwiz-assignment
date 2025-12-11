import { Request, Response } from "express";
import { UserActionRepositoryMySQL } from "../../../infrastructure/db/UserActionRepositoryMySQL";

const userActionRepo = new UserActionRepositoryMySQL();

export class AuditController {
	static async getMyLogs(req: Request, res: Response) {
		try {
			const userId = (req as any).user.id;
			const logs = await userActionRepo.getByUserId(userId);
			return res.json(logs);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
}
