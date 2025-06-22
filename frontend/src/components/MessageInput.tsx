import { useState } from "react";
import { Send } from "lucide-react";
import useSendMessage from "../hooks/useSendMessage";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

interface MessageInputProps {
    selectedConversation: {
        id: string;
        fullName: string;
    };
}

const MessageInput = ({ selectedConversation }: MessageInputProps) => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();
    const { messages, setMessages } = useConversation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const data = await sendMessage(message, selectedConversation.id);
            if (data) {
                setMessages([...messages, data]);
                setMessage("");
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to send message");
        }
    };

    return (
        <form className="px-4 py-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-base rounded-lg block w-full p-4 bg-gray-800 border-gray-700 text-white focus:outline-none focus:border-blue-500 h-14"
                    placeholder={`Message ${selectedConversation.fullName}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 end-0 flex items-center pe-4 disabled:opacity-50"
                    disabled={loading || !message.trim()}
                >
                    {loading ? (
                        <span className="loading loading-spinner" />
                    ) : (
                        <Send className="w-6 h-6 text-white hover:text-blue-400 transition-colors" />
                    )}
                </button>
            </div>
        </form>
    );
};

export default MessageInput; 