import RoleBadge from "../Components/RoleBadge";
import MOCK_USERS from "../data";
import useAuth from "../Hooks/useAuth";

const DashboardContent = () => {
	const { user, hasRole, hasAnyRole } = useAuth();

	return (
		<div className="max-w-6xl mx-auto px-4 py-8 ">
			<div className="mb-8">
				<h1 className="text-3xl font-semibold text-gray-900 mb-2">
					Dashboard
				</h1>
				<p className="text-gray-600">Welcome back, {user?.name}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Profile Card - Available to all roles */}
				<div className="bg-white border border-gray-200 rounded-lg p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="font-medium text-gray-900">
							Your Profile
						</h3>
						<RoleBadge role={user?.role} />
					</div>
					<div className="space-y-2 text-sm text-gray-600">
						<p>
							<span className="font-medium">Name:</span>{" "}
							{user.name}
						</p>
						<p>
							<span className="font-medium">Email:</span>{" "}
							{user.email}
						</p>
						<p>
							<span className="font-medium">Role:</span>{" "}
							{user.role}
						</p>
					</div>
				</div>

				{/* Admin-only content */}
				{hasRole("admin") && (
					<>
						<div className="bg-white border border-gray-200 rounded-lg p-6">
							<h3 className="font-medium text-gray-900 mb-4">
								User Management
							</h3>
							<p className="text-sm text-gray-600 mb-4">
								Manage all system users and their permissions.
							</p>
							<div className="text-sm text-blue-600">
								Total Users: {MOCK_USERS.length}
							</div>
						</div>

						<div className="bg-white border border-gray-200 rounded-lg p-6">
							<h3 className="font-medium text-gray-900 mb-4">
								System Settings
							</h3>
							<p className="text-sm text-gray-600">
								Configure system-wide settings and preferences.
							</p>
						</div>
					</>
				)}

				{/* Admin and User content */}
				{hasAnyRole(["admin", "user"]) && (
					<div className="bg-white border border-gray-200 rounded-lg p-6">
						<h3 className="font-medium text-gray-900 mb-4">
							Reports
						</h3>
						<p className="text-sm text-gray-600 mb-4">
							View and generate reports.
						</p>
						<div className="text-sm text-green-600">
							Access Level:{" "}
							{hasRole("admin")
								? "Full Access"
								: "Limited Access"}
						</div>
					</div>
				)}

				{/* Guest limited content */}
				{hasRole("guest") && (
					<div className="bg-white border border-gray-200 rounded-lg p-6">
						<h3 className="font-medium text-gray-900 mb-4">
							Limited Access
						</h3>
						<p className="text-sm text-gray-600">
							You have guest access. Contact an administrator for
							additional permissions.
						</p>
					</div>
				)}

				{/* Activity feed for all users */}
				<div className="bg-white border border-gray-200 rounded-lg p-6 md:col-span-2 lg:col-span-3">
					<h3 className="font-medium text-gray-900 mb-4">
						Recent Activity
					</h3>
					<div className="space-y-3">
						<div className="flex items-center space-x-3 text-sm">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span className="text-gray-600">
								You logged in successfully
							</span>
							<span className="text-gray-400">Just now</span>
						</div>
						{hasAnyRole(["admin", "user"]) && (
							<div className="flex items-center space-x-3 text-sm">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								<span className="text-gray-600">
									Report generated
								</span>
								<span className="text-gray-400">
									2 hours ago
								</span>
							</div>
						)}
						{hasRole("admin") && (
							<div className="flex items-center space-x-3 text-sm">
								<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
								<span className="text-gray-600">
									New user registered
								</span>
								<span className="text-gray-400">
									5 hours ago
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
export default DashboardContent;
