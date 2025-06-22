import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<button
			onClick={logout}
			disabled={loading}
			className="w-full flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
		>
			<LogOut className="w-5 h-5" />
			<span>{loading ? "Logging out..." : "Logout"}</span>
		</button>
	);
};

export default LogoutButton;
