import { useState } from "react";

import RegisterForm from "./Components/RegisterForm";
import useAuth from "./Hooks/useAuth";
import AuthProvider from "./AuthProvider";
import DashboardContent from "./Pages/DashboardPage";
import Navigation from "./Components/Navigation";
import LoginForm from "./Components/Login";

// Auth Context for managing authentication state

// Mock user database (in real app, this would be in backend)

// Mock JWT token generation (in real app, this would be done by backend)

// Mock API service (simulates backend calls)

// Auth Provider Component

// Hook to use auth context

// Input Component

// Button Component

// Login Component

// Register Component

// Navigation Component

// Role Badge Component

// Dashboard Content based on role

// Main App Component
const App = () => {
	const [showLogin, setShowLogin] = useState(true);
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-gray-600">Loading...</div>
			</div>
		);
	}
	console.log("User:", user);
	if (!user.role) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
				{showLogin ? (
					<LoginForm onToggleForm={() => setShowLogin(false)} />
				) : (
					<RegisterForm onToggleForm={() => setShowLogin(true)} />
				)}
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<Navigation />
			<DashboardContent />
		</div>
	);
};

// Root App with Auth Provider
export default function AuthApp() {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
}
