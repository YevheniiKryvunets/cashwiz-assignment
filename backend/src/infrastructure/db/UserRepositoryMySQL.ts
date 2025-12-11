import { db } from "./mysqlClient";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";

export class UserRepositoryMySQL implements IUserRepository {
	async findByEmail(email: string): Promise<User | null> {
		const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [
			email,
		]);
		return rows[0] || null;
	}

	async findById(id: number): Promise<User | null> {
		const [rows]: any = await db.query("SELECT * FROM users WHERE id = ?", [
			id,
		]);
		return rows[0] || null;
	}
}
