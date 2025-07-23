export type UserRole = "admin" | "user" | "guest";
const RoleBadge = ({ role }: { role: UserRole }) => {
	const colors = {
		admin: "bg-red-100 text-red-800",
		user: "bg-blue-100 text-blue-800",
		guest: "bg-gray-100 text-gray-800",
	};

	return (
		<span
			className={`px-2 py-1 rounded-full text-xs font-medium ${colors[role]}`}
		>
			{role?.charAt(0).toUpperCase() + role?.slice(1)}
		</span>
	);
};
export default RoleBadge;
