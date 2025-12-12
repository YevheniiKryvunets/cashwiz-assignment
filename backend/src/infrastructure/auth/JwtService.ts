import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const JwtService = {
	sign(payload: object) {
		return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
	},

	verify(token: string) {
		return jwt.verify(token, env.JWT_SECRET);
	},
};
