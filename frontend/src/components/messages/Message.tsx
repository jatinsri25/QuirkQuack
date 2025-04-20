import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation, { MessageType } from "../../zustand/useConversation";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
  const chatClass = fromMe ? "chat-end" : "chat-start";

  const bubbleBg = fromMe ? "bg-blue-600" : "bg-gray-300";
  const bubbleTextColor = fromMe ? "text-white" : "text-black";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black">
          <img alt="User Avatar" src={img} className="object-cover w-full h-full" />
        </div>
      </div>
      <div className="chat-bubble-container">
        <p
          className={`chat-bubble ${bubbleBg} ${bubbleTextColor} ${shakeClass} text-sm md:text-md rounded-xl py-2 px-4 shadow-md max-w-xs md:max-w-md`}
        >
          {message.body}
        </p>
        <span className="chat-footer text-xs opacity-70 flex gap-1 items-center text-white">
          {extractTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
};
export default Message;
