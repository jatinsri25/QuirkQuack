import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();
    const { messages, setMessages, selectedConversation } = useConversation();
    const { socket } = useSocketContext();

    const sendMessage = async (message: string) => {
        if (!authUser) {
            toast.error("You must be logged in to send messages");
            return;
        }

        if (!selectedConversation) {
            toast.error("No conversation selected");
            return;
        }

        if (!socket) {
            toast.error("Socket connection not established");
            return;
        }

        console.log("Sending message:", { message, receiverId: selectedConversation.id });
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/messages/send/${selectedConversation.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ message }),
            });

            console.log("Response status:", res.status);
            const data = await res.json();
            console.log("Response data:", data);

            if (!res.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            // Emit socket event for real-time updates
            socket.emit("newMessage", {
                ...data,
                receiverId: selectedConversation.id
            });

            setMessages([...messages, data]);
            return data;
        } catch (error: any) {
            console.error("Error sending message:", error);
            toast.error(error.message || "Failed to send message");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
};

export default useSendMessage; 