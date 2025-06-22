import { useAuthContext } from "../context/AuthContext";
import { extractTime } from "../utils/extractTime";

interface MessageProps {
    message: {
        id: string;
        body: string;
        senderId: string;
        createdAt: string;
        sender: {
            fullName: string;
            profilePic: string;
        };
    };
}

const Message = ({ message }: MessageProps) => {
    const { authUser } = useAuthContext();
    const fromMe = message.senderId === authUser?.id;

    return (
        <div className={`chat ${fromMe ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="user avatar" src={message.sender.profilePic} />
                </div>
            </div>
            <div className="chat-header">
                {!fromMe && message.sender.fullName}
                <time className="text-xs opacity-50">{extractTime(message.createdAt)}</time>
            </div>
            <div
                className={`chat-bubble ${fromMe ? "chat-bubble-primary" : "chat-bubble-secondary"}`}
            >
                {message.body}
            </div>
        </div>
    );
};

export default Message; 