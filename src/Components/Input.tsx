import { useState } from "react";

interface InputProps {
	label: string;
	type?: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	error?: string;
}
import { Eye, EyeOff } from "lucide-react";

const Input = ({
	label,
	type = "text",
	value,
	onChange,
	placeholder,
	error,
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="space-y-1">
			<label className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<div className="relative">
				<input
					type={type === "password" && showPassword ? "text" : type}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
						error ? "border-red-300 bg-red-50" : "border-gray-300"
					}`}
				/>
				{type === "password" && (
					<button
						type="button"
						onClick={() => setShowPassword(!showPassword)}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
					>
						{showPassword ? (
							<EyeOff size={18} />
						) : (
							<Eye size={18} />
						)}
					</button>
				)}
			</div>
			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
};
export default Input;
