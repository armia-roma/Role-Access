import type { UserRole } from "../Components/RoleBadge";
import MOCK_USERS from "../data";

export interface IUser {
	id: number;
	email: string;
	role: UserRole;
	name: string;
}

const generateMockToken = (user: IUser) => {
	const payload = {
		userId: user.id,
		email: user.email,
		role: user.role,
		exp: Date.now() + 3600000, // 1 hour expiry
	};
	// Encodes the string to Base64. For example: eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBlbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImV4cCI6MTcyMTY3MDAwMDAwMH0=
	return btoa(JSON.stringify(payload));
};
const authService = {
	// Simulate login API call

	login: async (email: string, password: string) => {
		await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

		const user = MOCK_USERS.find(
			(u) => u.email === email && u.password === password
		) as IUser;
		if (!user) {
			throw new Error("Invalid credentials");
		}

		const token = generateMockToken(user as IUser);
		return {
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				name: user.name,
			},
			token,
		};
	},

	// Simulate registration API call
	register: async (name: string, email: string, password: string) => {
		await new Promise((resolve) => setTimeout(resolve, 500));

		if (MOCK_USERS.find((u) => u.email === email)) {
			throw new Error("User already exists");
		}

		const newUser = {
			id: MOCK_USERS.length + 1,
			email,
			password,
			role: "user" as UserRole, // Default role for new users
			name,
		};
		MOCK_USERS.push(newUser);

		const token = generateMockToken(newUser);
		return {
			user: {
				id: newUser.id,
				email: newUser.email,
				role: newUser.role,
				name: newUser.name,
			},
			token,
		};
	},

	// Simulate token validation
	validateToken: async (token: string) => {
		if (!token) return null;

		try {
			//Decodes the Base64 string back into a JSON string
			const payload = JSON.parse(atob(token));
			if (payload.exp < Date.now()) {
				throw new Error("Token expired");
			}

			const user = MOCK_USERS.find((u) => u.id === payload.userId);
			if (!user) throw new Error("User not found");

			return {
				id: user.id,
				email: user.email,
				role: user.role,
				name: user.name,
			};
		} catch {
			return null;
		}
	},
};
export default authService;
