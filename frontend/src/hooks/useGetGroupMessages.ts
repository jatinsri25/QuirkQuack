import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "../context/AuthContext";

const useGetGroupMessages = (selectedGroupId: string) => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const { authUser } = useAuthContext();

    const getMessages = useCallback(async () => {
        if (!authUser?._id || !selectedGroupId) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/messages/group/${selectedGroupId}`);
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMessages(data);
        } catch (error: any) {
            console.error("Error in getGroupMessages: ", error.message);
        } finally {
            setLoading(false);
        }
    }, [selectedGroupId, authUser?._id]);

    useEffect(() => {
        getMessages();
    }, [getMessages]);

    return { messages, loading, setMessages };
};

export default useGetGroupMessages; 