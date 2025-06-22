import { useState } from "react";
import useGetGroups from "../../hooks/useGetGroups";
import CreateGroup from "./CreateGroup";
import { Plus } from "lucide-react";

interface GroupsProps {
    onSelectGroup?: (group: any) => void;
}

const Groups = ({ onSelectGroup }: GroupsProps) => {
    const { loading, groups } = useGetGroups();
    const [showCreateGroup, setShowCreateGroup] = useState(false);

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold">Groups</h2>
                <button
                    onClick={() => setShowCreateGroup(true)}
                    className="btn btn-circle btn-sm"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {showCreateGroup ? (
                <CreateGroup onClose={() => setShowCreateGroup(false)} />
            ) : (
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <span className="loading loading-spinner loading-md"></span>
                        </div>
                    ) : (
                        <div className="p-4 space-y-2">
                            {groups.map((group) => (
                                <div
                                    key={group.id}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                                    onClick={() => onSelectGroup?.(group)}
                                >
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-12">
                                            <span className="text-xl">
                                                {group.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold">{group.name}</div>
                                        <div className="text-sm opacity-70">
                                            {group.members.length} members
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Groups; 