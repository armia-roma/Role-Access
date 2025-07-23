import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import Input from "./Input";
import Button from "./Button";

interface RegisterFormProps {
	onToggleForm: () => void;
}
interface IErrors {
	name?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	general?: string;
}
const RegisterForm = ({ onToggleForm }: RegisterFormProps) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<IErrors>({});
	const [loading, setLoading] = useState(false);
	const { register } = useAuth();

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		setErrors({});

		// Validation
		const newErrors: IErrors = {};
		if (!name.trim()) newErrors.name = "Name is required";
		if (!email.trim()) newErrors.email = "Email is required";
		if (!password) newErrors.password = "Password is required";
		if (password.length < 6)
			newErrors.password = "Password must be at least 6 characters";
		if (password !== confirmPassword)
			newErrors.confirmPassword = "Passwords do not match";

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setLoading(true);
		try {
			await register(name, email, password);
		} catch (error: any) {
			setErrors({ general: error.message });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-2xl font-semibold text-gray-900 mb-2">
					Create account
				</h1>
				<p className="text-gray-600">Join us and get started</p>
			</div>

			<div className="space-y-4">
				{errors.general && (
					<div className="p-3 bg-red-50 border border-red-200 rounded-lg">
						<p className="text-sm text-red-700">{errors.general}</p>
					</div>
				)}

				<Input
					label="Full Name"
					value={name}
					onChange={setName}
					placeholder="Enter your full name"
					error={errors.name}
				/>

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
					placeholder="Create a password"
					error={errors.password}
				/>

				<Input
					label="Confirm Password"
					type="password"
					value={confirmPassword}
					onChange={setConfirmPassword}
					placeholder="Confirm your password"
					error={errors.confirmPassword}
				/>

				<Button onClick={handleSubmit} loading={loading}>
					Create Account
				</Button>
			</div>

			<p className="text-center text-sm text-gray-600 mt-6">
				Already have an account?{" "}
				<button
					onClick={onToggleForm}
					className="text-blue-600 hover:text-blue-800 font-medium"
				>
					Sign in
				</button>
			</p>
		</div>
	);
};
export default RegisterForm;
