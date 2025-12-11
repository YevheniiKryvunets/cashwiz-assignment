export const env = {
	JWT_SECRET: process.env.JWT_SECRET || "supersecret",
	DB_HOST: process.env.DB_HOST || "localhost",
	DB_USER: process.env.DB_USER || "root",
	DB_PASSWORD: process.env.DB_PASSWORD || "",
	DB_NAME: process.env.DB_NAME || "cashwiz",
};
