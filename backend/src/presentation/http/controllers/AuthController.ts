import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserRepositoryMySQL } from "../../../infrastructure/db/UserRepositoryMySQL";
import { UserActionRepositoryMySQL } from "../../../infrastructure/db/UserActionRepositoryMySQL";
import { JwtService } from "../../../infrastructure/auth/JwtService";

const userRepo = new UserRepositoryMySQL();
const userActionRepo = new UserActionRepositoryMySQL();

export class AuthController {
	static async login(req: Request, res: Response) {
		const { email, password } = req.body;

		try {
			const user = await userRepo.findByEmail(email);
			if (!user) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			const match = await bcrypt.compare(password, user.password_hash);
			if (!match) {
				return res.status(401).json({ message: "Invalid credentials" });
			}

			const token = JwtService.sign({
				id: user.id,
				email: user.email,
				role: user.role,
			});

			// log successful login
			await userActionRepo.logAction(user.id, "LOGIN_SUCCESS");

			return res.json({ token, user });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
}
