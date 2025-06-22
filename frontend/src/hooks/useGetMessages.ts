import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const useGetMessages = (selectedConversationId: string) => {
	const [loading, setLoading] = useState(false);
	const [messages, setMessages] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		const getMessages = async () => {
			if (!authUser?._id || !selectedConversationId) return;

			setLoading(true);
			try {
				const res = await fetch(`${API_BASE_URL}/api/messages/${selectedConversationId}`, {
					credentials: "include"
				});

				if (!res.ok) {
					const error = await res.json();
					throw new Error(error.error || "Failed to fetch messages");
				}

				const data = await res.json();
				setMessages(data);
			} catch (error: any) {
				console.error("Error in getMessages: ", error.message);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getMessages();
	}, [selectedConversationId, authUser?._id]);

	return { messages, loading, setMessages };
};

export default useGetMessages;
