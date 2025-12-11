import express from "express";
import cors from "cors";
import { authRoutes } from "./presentation/http/routes/authRoutes";
import { userRoutes } from "./presentation/http/routes/userRoutes";
import { auditRoutes } from "./presentation/http/routes/auditRoutes";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/audit", auditRoutes);

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});
