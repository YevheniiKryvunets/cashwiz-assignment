const API_URL = "http://localhost:4000";

export type Role = "admin" | "user";

export interface User {
	id: number;
	email: string;
	full_name: string;
	role: Role;
	created_at: string;
}

export interface AuditLog {
	id: number;
	user_id: number;
	action: string;
	created_at: string;
}

export async function login(
	email: string,
	password: string,
): Promise<{ token: string; user: User }> {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});

	if (!res.ok) {
		throw new Error("Invalid credentials");
	}

	return res.json();
}

export async function fetchMe(token: string): Promise<User> {
	const res = await fetch(`${API_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to load user");
	}

	return res.json();
}

export async function fetchMyLogs(token: string): Promise<AuditLog[]> {
	const res = await fetch(`${API_URL}/audit/my-logs`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to load logs");
	}

	return res.json();
}
