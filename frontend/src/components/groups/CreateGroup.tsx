import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useGetUsers from "../../hooks/useGetUsers";
import toast from "react-hot-toast";

const CreateGroup = () => {
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const { loading, users } = useGetUsers();
    const { authUser } = useAuthContext();

    const handleCreateGroup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!groupName.trim()) {
            toast.error("Group name is required");
            return;
        }
        if (selectedUsers.length === 0) {
            toast.error("Select at least one member");
            return;
        }

        try {
            const res = await fetch("/api/groups/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: groupName,
                    members: selectedUsers,
                }),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            toast.success("Group created successfully");
            setGroupName("");
            setSelectedUsers([]);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const toggleUserSelection = (userId: string) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    return (
        <div className="p-4">
            <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                    <label className="label">
                        <span className="label-text">Group Name</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group name"
                    />
                </div>

                <div>
                    <label className="label">
                        <span className="label-text">Select Members</span>
                    </label>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {loading ? (
                            <span className="loading loading-spinner loading-md"></span>
                        ) : (
                            users
                                .filter((user) => user.id !== authUser?.id)
                                .map((user) => (
                                    <div
                                        key={user.id}
                                        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${selectedUsers.includes(user.id) ? "bg-gray-700" : ""
                                            }`}
                                        onClick={() => toggleUserSelection(user.id)}
                                    >
                                        <div className="avatar">
                                            <div className="w-8 rounded-full">
                                                <img src={user.profilePic} alt="user avatar" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-bold">{user.fullName}</div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={loading || !groupName.trim() || selectedUsers.length === 0}
                >
                    Create Group
                </button>
            </form>
        </div>
    );
};

export default CreateGroup; 