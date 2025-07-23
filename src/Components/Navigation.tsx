import {
	User,
	Settings,
	Home,
	Users,
	FileText,
	LogOut,
	ActivitySquareIcon as Activity,
} from "lucide-react";
import useAuth from "../Hooks/useAuth";
import Button from "./Button";
import type { UserRole } from "./RoleBadge";
const Navigation = () => {
	const { user, logout, hasAnyRole } = useAuth();

	const navItems = [
		{
			name: "Dashboard",
			icon: Home,
			path: "dashboard",
			roles: ["admin", "user", "guest"],
		},
		{ name: "Users", icon: Users, path: "users", roles: ["admin"] },
		{
			name: "Reports",
			icon: FileText,
			path: "reports",
			roles: ["admin", "user"],
		},
		{
			name: "Settings",
			icon: Settings,
			path: "settings",
			roles: ["admin", "user", "guest"],
		},
	];

	return (
		<nav className="bg-white border-b border-gray-200">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center space-x-8">
						<div className="flex items-center space-x-2">
							<Activity className="h-6 w-6 text-blue-600" />
							<span className="font-semibold text-gray-900">
								App
							</span>
						</div>

						<div className="hidden md:flex space-x-6">
							{navItems.map(
								(item) =>
									hasAnyRole(item.roles as UserRole[]) && (
										<button
											key={item.path}
											className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 py-2"
										>
											<item.icon size={18} />
											<span>{item.name}</span>
										</button>
									)
							)}
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<User size={18} className="text-gray-500" />
							<div className="text-sm">
								<div className="font-medium text-gray-900">
									{user.name}
								</div>
								<div className="text-gray-500 capitalize">
									{user.role}
								</div>
							</div>
						</div>

						<Button
							onClick={logout}
							variant="secondary"
							className="!w-auto !py-2 !px-4 flex items-center space-x-1"
						>
							<LogOut size={16} />
							<span>Logout</span>
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
};
export default Navigation;
