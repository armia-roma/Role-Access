import { createContext } from "react";
import type { IUser } from "../services/authService";
import type { UserRole } from "../Components/RoleBadge";
interface IAuthContext {
	user: IUser;
	login: (email: string, password: string) => Promise<IUser>;
	register: (name: string, email: string, password: string) => Promise<IUser>;
	logout: () => void;
	loading: boolean;
	hasRole: (role: UserRole) => boolean;
	hasAnyRole: (roles: UserRole[]) => boolean;
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export default AuthContext;
