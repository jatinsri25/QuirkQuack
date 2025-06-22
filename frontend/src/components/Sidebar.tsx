import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useGetUsers from "../hooks/useGetUsers";
import useGetGroups from "../hooks/useGetGroups";
import Conversation from "./Conversation";
import Groups from "./groups/Groups";
import { Users, MessageSquare } from "lucide-react";
import LogoutButton from "./sidebar/LogoutButton";

interface SidebarProps {
    onSelectConversation?: (conversation: any) => void;
    onSelectGroup?: (group: any) => void;
}

const Sidebar = ({ onSelectConversation, onSelectGroup }: SidebarProps) => {
    const { authUser } = useAuthContext();
    const { loading: usersLoading, users } = useGetUsers();
    const { loading: groupsLoading, groups } = useGetGroups();
    const [activeTab, setActiveTab] = useState<"chats" | "groups">("chats");

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={authUser?.profilePic} alt="user avatar" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{authUser?.fullName}</div>
                        <div className="text-sm opacity-70">Online</div>
                    </div>
                </div>
            </div>

            <div className="flex border-b border-gray-700">
                <button
                    className={`flex-1 p-4 flex items-center justify-center gap-2 ${activeTab === "chats" ? "bg-gray-700" : ""
                        }`}
                    onClick={() => setActiveTab("chats")}
                >
                    <MessageSquare className="w-5 h-5" />
                    <span>Chats</span>
                </button>
                <button
                    className={`flex-1 p-4 flex items-center justify-center gap-2 ${activeTab === "groups" ? "bg-gray-700" : ""
                        }`}
                    onClick={() => setActiveTab("groups")}
                >
                    <Users className="w-5 h-5" />
                    <span>Groups</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeTab === "chats" ? (
                    <div className="p-4 space-y-2">
                        {usersLoading ? (
                            <div className="flex justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        ) : (
                            users
                                .filter((user) => user.id !== authUser?.id)
                                .map((user) => (
                                    <Conversation
                                        key={user.id}
                                        conversation={user}
                                        onSelectConversation={onSelectConversation}
                                    />
                                ))
                        )}
                    </div>
                ) : (
                    <Groups onSelectGroup={onSelectGroup} />
                )}
            </div>

            <div className="p-4 border-t border-gray-700">
                <LogoutButton />
            </div>
        </div>
    );
};

export default Sidebar; 