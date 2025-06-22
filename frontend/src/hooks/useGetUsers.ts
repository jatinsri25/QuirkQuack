import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const useGetUsers = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/messages/conversations");
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setUsers(data);
            } catch (error: any) {
                console.error("Error in getUsers: ", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (authUser?.id) getUsers();
    }, [authUser?.id]);

    return { loading, users };
};

export default useGetUsers; 