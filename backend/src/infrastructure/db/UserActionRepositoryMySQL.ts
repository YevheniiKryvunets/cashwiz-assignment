import { db } from "./mysqlClient";
import { UserAction } from "../../domain/entities/UserAction";

export class UserActionRepositoryMySQL {
	async logAction(userId: number, action: string): Promise<void> {
		await db.query("INSERT INTO user_actions (user_id, action) VALUES (?, ?)", [
			userId,
			action,
		]);
	}

	async getByUserId(userId: number): Promise<UserAction[]> {
		const [rows]: any = await db.query(
			"SELECT * FROM user_actions WHERE user_id = ? ORDER BY created_at DESC",
			[userId],
		);
		return rows;
	}
}
