import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

interface SocketContextType {
	socket: Socket | null;
	onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	onlineUsers: [],
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }: { children: ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socket = io(SOCKET_URL, {
				query: {
					userId: authUser.id,
				},
			});

			socket.on("connect", () => {
				console.log("Connected to socket server");
			});

			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			setSocket(socket);

			return () => {
				socket.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
