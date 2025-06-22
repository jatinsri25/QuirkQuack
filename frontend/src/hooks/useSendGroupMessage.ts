import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSendGroupMessage = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();

    const sendGroupMessage = async (message: string, groupId: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/groups/message/${groupId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            return data;
        } catch (error: any) {
            toast.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendGroupMessage };
};

export default useSendGroupMessage; 