import { useAuthContext } from "../context/AuthContext";
import { useSocketContext } from "../context/SocketContext";

interface ConversationProps {
    conversation: {
        id: string;
        fullName: string;
        profilePic: string;
    };
    onSelectConversation?: (conversation: ConversationProps["conversation"]) => void;
}

const Conversation = ({ conversation, onSelectConversation }: ConversationProps) => {
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation.id);

    return (
        <div
            className={`flex gap-2 items-center hover:bg-gray-700 rounded p-2 py-1 cursor-pointer ${isOnline ? "bg-gray-700" : ""
                }`}
            onClick={() => onSelectConversation?.(conversation)}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className="w-12 rounded-full">
                    <img src={conversation.profilePic} alt="user avatar" />
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">{conversation.fullName}</p>
                </div>
            </div>
        </div>
    );
};

export default Conversation; 