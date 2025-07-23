import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import Input from "./Input";
import Button from "./Button";

interface LoginFormProps {
	onToggleForm: () => void;
}
const LoginForm = ({ onToggleForm }: LoginFormProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{
		password?: string;
		general?: string;
		email?: string;
	}>({});
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setErrors({});

		// Basic validation
		const newErrors: { email?: string; password?: string } = {};
		if (!email.trim()) newErrors.email = "Email is required";
		if (!password.trim()) newErrors.password = "Password is required";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setLoading(true);
		try {
			await login(email, password);
		} catch (error) {
			setErrors({ general: "error" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-2xl font-semibold text-gray-900 mb-2">
					Welcome back
				</h1>
				<p className="text-gray-600">Please sign in to your account</p>
			</div>

			{/* Demo credentials */}
			<div className="mb-6 p-4 rounded-lg">
				<p className="text-sm font-medium text-blue-800 mb-2">
					Demo Credentials:
				</p>
				<div className="text-xs text-blue-700 space-y-1">
					<div>Admin: admin@example.com / admin123</div>
					<div>User: user@example.com / user123</div>
					<div>Guest: guest@example.com / guest123</div>
				</div>
			</div>

			<div className="space-y-4">
				{errors.general && (
					<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-sm text-red-700">{errors.general}</p>
					</div>
				)}

				<Input
					label="Email"
					type="email"
					value={email}
					onChange={setEmail}
					placeholder="Enter your email"
					error={errors.email}
				/>

				<Input
					label="Password"
					type="password"
					value={password}
					onChange={setPassword}
					placeholder="Enter your password"
					error={errors.password}
				/>

				<Button onClick={handleSubmit} loading={loading}>
					Sign In
				</Button>
			</div>

			<p className="text-center text-sm text-gray-600 mt-6">
				Don't have an account?{" "}
				<button
					onClick={onToggleForm}
					className="text-blue-600 hover:text-blue-800 font-medium"
				>
					Sign up
				</button>
			</p>
		</div>
	);
};
export default LoginForm;
