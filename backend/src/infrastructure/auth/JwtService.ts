import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const JwtService = {
	sign(payload: object) {
		return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });
	},

	verify(token: string) {
		return jwt.verify(token, env.JWT_SECRET);
	},
};
