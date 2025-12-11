import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../../infrastructure/auth/JwtService";

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer ")) {
		return res.status(401).json({ message: "No token provided" });
	}

	try {
		const token = header.split(" ")[1];
		const decoded: any = JwtService.verify(token);
		(req as any).user = decoded;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Invalid token" });
	}
}
