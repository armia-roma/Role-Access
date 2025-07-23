interface ButtonProps {
	children: React.ReactNode;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "submit" | "reset";
	variant?: "primary" | "secondary" | "danger";
	disabled?: boolean;
	loading?: boolean;
	className?: string;
}
const Button = ({
	children,
	onClick,
	type = "button",
	variant = "primary",
	disabled,
	loading,
	className = "",
}: ButtonProps) => {
	const baseClasses =
		"w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
	const variants = {
		primary:
			"bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400",
		secondary:
			"bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
		danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
			className={`${baseClasses} ${variants[variant]} ${className}`}
		>
			{loading ? "Loading..." : children}
		</button>
	);
};
export default Button;
