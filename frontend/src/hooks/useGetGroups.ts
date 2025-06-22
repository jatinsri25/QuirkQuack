import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

const useGetGroups = () => {
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const getGroups = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/groups");
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setGroups(data);
            } catch (error: any) {
                console.error("Error in getGroups: ", error.message);
            } finally {
                setLoading(false);
            }
        };

        if (authUser?._id) getGroups();
    }, [authUser?._id]);

    return { loading, groups };
};

export default useGetGroups; 