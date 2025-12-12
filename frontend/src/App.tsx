import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	TextField,
	Typography,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Stack,
	Alert,
	Divider,
} from "@mui/material";
import { login, fetchMe, fetchMyLogs, User, AuditLog } from "./api";
import { useForm } from "react-hook-form";

type LoginFormValues = {
	email: string;
	password: string;
};

function App() {
	const [token, setToken] = useState<string | null>(() =>
		localStorage.getItem("token"),
	);
	const [user, setUser] = useState<User | null>(null);
	const [logs, setLogs] = useState<AuditLog[]>([]);
	// const [email, setEmail] = useState("test@test.com");
	// const [password, setPassword] = useState("password123");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		defaultValues: {
			email: "test@test.com",
			password: "password123",
		},
	});

	useEffect(() => {
		if (!token) {
			setUser(null);
			setLogs([]);
			return;
		}

		const init = async () => {
			try {
				setLoading(true);
				setError(null);
				const [me, myLogs] = await Promise.all([
					fetchMe(token),
					fetchMyLogs(token),
				]);
				setUser(me);
				setLogs(myLogs);
			} catch (err) {
				console.error(err);
				setError("Failed to load profile or logs");
			} finally {
				setLoading(false);
			}
		};

		void init();
	}, [token]);

	// const handleLogin = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	try {
	// 		setLoading(true);
	// 		setError(null);
	// 		const { token: newToken, user } = await login(email, password);
	// 		setToken(newToken);
	// 		localStorage.setItem("token", newToken);
	// 		setUser(user);
	// 	} catch (err: any) {
	// 		setError(err.message || "Login failed");
	// 	} finally {
	// 		setLoading(false);
	// 	}
	// };
	const handleLogin = async (values: LoginFormValues) => {
		try {
			setLoading(true);
			setError(null);

			const { token: newToken, user } = await login(
				values.email,
				values.password,
			);

			setToken(newToken);
			localStorage.setItem("token", newToken);
			setUser(user);
		} catch (err: any) {
			setError(err.message || "Login failed");
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		setToken(null);
		setUser(null);
		setLogs([]);
		localStorage.removeItem("token");
	};

	if (!token || !user) {
		return (
			<Container
				maxWidth="sm"
				sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
			>
				<Card sx={{ width: "100%", p: 2 }}>
					<CardContent>
						<Typography variant="h5" gutterBottom>
							Login to Audit System
						</Typography>
						<Typography variant="body2" color="text.secondary" mb={2}>
							Use the demo credentials to sign in.
						</Typography>

						<Box component="form" onSubmit={handleSubmit(handleLogin)}>
							<Stack spacing={2}>
								{/* <TextField
									label="Email"
									type="email"
									value={email}
									onChange={e => setEmail(e.target.value)}
									fullWidth
									required
								/> */}
								<TextField
									label="Email"
									type="email"
									fullWidth
									required
									{...register("email", { required: "Email is required" })}
									error={!!errors.email}
									helperText={errors.email?.message}
								/>
								{/* <TextField
									label="Password"
									type="password"
									value={password}
									onChange={e => setPassword(e.target.value)}
									fullWidth
									required
								/> */}
								<TextField
									label="Password"
									type="password"
									fullWidth
									required
									{...register("password", {
										required: "Password is required",
									})}
									error={!!errors.password}
									helperText={errors.password?.message}
								/>

								{error && <Alert severity="error">{error}</Alert>}

								<Button
									type="submit"
									variant="contained"
									disabled={loading}
									fullWidth
								>
									{loading ? "Logging in..." : "Login"}
								</Button>

								<Typography variant="caption" color="text.secondary">
									Test user: <b>test@test.com</b> / <b>password123</b>
								</Typography>
							</Stack>
						</Box>
					</CardContent>
				</Card>
			</Container>
		);
	}

	return (
		<Container
			maxWidth="md"
			sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
		>
			<Card sx={{ width: "100%", p: 2 }}>
				<CardContent>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						mb={2}
					>
						<Box>
							<Typography variant="h5">User Profile</Typography>
							<Typography variant="body2" color="text.secondary">
								Logged in as <b>{user.email}</b> ({user.role})
							</Typography>
						</Box>
						<Button variant="outlined" color="inherit" onClick={handleLogout}>
							Logout
						</Button>
					</Box>

					{error && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{error}
						</Alert>
					)}

					<Typography variant="subtitle1" gutterBottom>
						Profile
					</Typography>
					<Table size="small" sx={{ mb: 3 }}>
						<TableBody>
							<TableRow>
								<TableCell>Full name</TableCell>
								<TableCell>{user.full_name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Email</TableCell>
								<TableCell>{user.email}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Role</TableCell>
								<TableCell>{user.role}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Created at</TableCell>
								<TableCell>
									{new Date(user.created_at).toLocaleString()}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					<Divider sx={{ mb: 2 }} />

					<Typography variant="subtitle1" gutterBottom>
						My Audit Logs
					</Typography>

					{logs.length === 0 ? (
						<Typography variant="body2" color="text.secondary">
							No logs yet.
						</Typography>
					) : (
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Action</TableCell>
									<TableCell>Created at</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{logs.map(log => (
									<TableRow key={log.id}>
										<TableCell>{log.id}</TableCell>
										<TableCell>{log.action}</TableCell>
										<TableCell>
											{new Date(log.created_at).toLocaleString()}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</Container>
	);
}

export default App;
