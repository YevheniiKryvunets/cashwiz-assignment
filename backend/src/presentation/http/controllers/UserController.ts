import { Request, Response } from "express";
import { UserRepositoryMySQL } from "../../../infrastructure/db/UserRepositoryMySQL";

const userRepo = new UserRepositoryMySQL();

export class UserController {
	static async me(req: Request, res: Response) {
		try {
			const userId = (req as any).user.id;
			const user = await userRepo.findById(userId);

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			return res.json(user);
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
}
