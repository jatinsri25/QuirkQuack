import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import useGetMessages from "../hooks/useGetMessages";
import useConversation from "../zustand/useConversation";
import Message from "./Message";

interface MessagesProps {
    selectedConversation: {
        id: string;
        fullName: string;
        profilePic: string;
    };
}

const Messages = ({ selectedConversation }: MessagesProps) => {
    const [localMessages, setLocalMessages] = useState([]);
    const { messages, loading } = useGetMessages(selectedConversation.id);
    const { socket } = useSocketContext();
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const { setMessages } = useConversation();

    useEffect(() => {
        setLocalMessages(messages);
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [localMessages]);

    useEffect(() => {
        socket?.on("newMessage", (message) => {
            if (message.senderId === selectedConversation.id || message.receiverId === selectedConversation.id) {
                setLocalMessages((prev) => [...prev, message]);
                setMessages((prev) => [...prev, message]);
            }
        });

        return () => {
            socket?.off("newMessage");
        };
    }, [socket, selectedConversation.id, setMessages]);

    return (
        <div className="px-4 flex-1 overflow-y-auto">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            ) : localMessages.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
            ) : (
                localMessages.map((message, idx) => (
                    <div key={message.id} ref={idx === localMessages.length - 1 ? lastMessageRef : null}>
                        <Message message={message} />
                    </div>
                ))
            )}
        </div>
    );
};

export default Messages; 