import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useGetGroupMessages from "../../hooks/useGetGroupMessages";
import GroupMessage from "./GroupMessage";
import GroupMessageInput from "./GroupMessageInput";

interface GroupChatContainerProps {
    selectedGroup: {
        id: string;
        name: string;
    };
}

const GroupChatContainer = ({ selectedGroup }: GroupChatContainerProps) => {
    const [localMessages, setLocalMessages] = useState([]);
    const { messages, loading } = useGetGroupMessages(selectedGroup.id);
    const { socket } = useSocketContext();
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLocalMessages(messages);
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [localMessages]);

    useEffect(() => {
        socket?.on("newGroupMessage", (message) => {
            if (message.groupId === selectedGroup.id) {
                setLocalMessages((prev) => [...prev, message]);
            }
        });

        return () => {
            socket?.off("newGroupMessage");
        };
    }, [socket, selectedGroup.id]);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
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
                            <GroupMessage message={message} />
                        </div>
                    ))
                )}
            </div>
            <GroupMessageInput selectedGroup={selectedGroup} />
        </div>
    );
};

export default GroupChatContainer; 