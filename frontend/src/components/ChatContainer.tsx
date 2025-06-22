import { useState } from "react";
import MessageInput from "./MessageInput";
import GroupMessageInput from "./groups/GroupMessageInput";
import Messages from "./Messages";
import GroupChatContainer from "./groups/GroupChatContainer";

interface ChatContainerProps {
    selectedConversation: {
        id: string;
        fullName: string;
        profilePic: string;
    } | null;
    selectedGroup: {
        id: string;
        name: string;
    } | null;
}

const ChatContainer = ({ selectedConversation, selectedGroup }: ChatContainerProps) => {
    if (!selectedConversation && !selectedGroup) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                {selectedConversation ? (
                    <Messages selectedConversation={selectedConversation} />
                ) : (
                    <GroupChatContainer selectedGroup={selectedGroup!} />
                )}
            </div>
            <div className="px-4 py-3">
                {selectedConversation ? (
                    <MessageInput selectedConversation={selectedConversation} />
                ) : (
                    <GroupMessageInput selectedGroup={selectedGroup!} />
                )}
            </div>
        </div>
    );
};

export default ChatContainer; 