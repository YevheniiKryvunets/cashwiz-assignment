import type { SignOptions } from "jsonwebtoken";

export interface AppEnv {
	JWT_SECRET: string;
	JWT_EXPIRES_IN: SignOptions["expiresIn"];
	DB_HOST: string;
	DB_USER: string;
	DB_PASSWORD: string;
	DB_NAME: string;
}

export const env: AppEnv = {
	JWT_SECRET: process.env.JWT_SECRET || "supersecret",
	JWT_EXPIRES_IN:
		(process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1h",

	DB_HOST: process.env.DB_HOST || "localhost",
	DB_USER: process.env.DB_USER || "root",
	DB_PASSWORD: process.env.DB_PASSWORD || "",
	DB_NAME: process.env.DB_NAME || "cashwiz",
};
