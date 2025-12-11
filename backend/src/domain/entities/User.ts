export interface User {
	id: number;
	email: string;
	password_hash: string;
	full_name: string;
	role: "admin" | "user";
}
