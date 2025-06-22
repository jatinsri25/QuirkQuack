import { useState } from "react";
import { Send } from "lucide-react";
import useSendGroupMessage from "../../hooks/useSendGroupMessage";

interface GroupMessageInputProps {
    selectedGroup: {
        id: string;
        name: string;
    };
}

const GroupMessageInput = ({ selectedGroup }: GroupMessageInputProps) => {
    const [message, setMessage] = useState("");
    const { loading, sendGroupMessage } = useSendGroupMessage();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await sendGroupMessage(message, selectedGroup.id);
            setMessage("");
        } catch (error) {
            console.error("Error sending group message:", error);
        }
    };

    return (
        <form className="px-4 mb-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-black border-black text-white focus:outline-none focus:border-gray-600"
                    placeholder={`Message ${selectedGroup.name}`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 end-0 flex items-center pe-3 disabled:opacity-50"
                    disabled={loading || !message.trim()}
                >
                    {loading ? (
                        <span className="loading loading-spinner" />
                    ) : (
                        <Send className="w-6 h-6 text-white" />
                    )}
                </button>
            </div>
        </form>
    );
};

export default GroupMessageInput; 