import { useEffect, useState } from "react";
import authService, { type IUser } from "./services/authService";
import AuthContext from "./Contexts/AuthContext";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser>({} as IUser);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check for stored token on app start
		const initAuth = async () => {
			const token = localStorage.getItem("authToken");
			if (token) {
				try {
					const userData = await authService.validateToken(token);
					if (userData) {
						setUser(userData as IUser);
					} else {
						localStorage.removeItem("authToken");
					}
				} catch {
					localStorage.removeItem("authToken");
				}
			}
			setLoading(false);
		};

		initAuth();
	}, []);

	const login = async (email: string, password: string) => {
		const { user: userData, token } = await authService.login(
			email,
			password
		);
		localStorage.setItem("authToken", token);
		setUser(userData as IUser);
		return userData;
	};

	const register = async (name: string, email: string, password: string) => {
		const { user: userData, token } = await authService.register(
			name,
			email,
			password
		);
		localStorage.setItem("authToken", token);
		setUser(userData);
		return userData;
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		setUser({} as IUser);
	};

	const hasRole = (role: string) => user?.role === role;
	const hasAnyRole = (roles: string[]) => roles.includes(user?.role);

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				register,
				logout,
				loading,
				hasRole,
				hasAnyRole,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;
