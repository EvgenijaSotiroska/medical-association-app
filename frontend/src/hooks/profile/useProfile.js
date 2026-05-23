import { useEffect, useState, useCallback } from "react";
import profileApi from "../../api/profileApi.js";

const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = useCallback(() => {
        setLoading(true);
        profileApi.getProfile()
            .then(res => {
                setProfile(res.data);
                setError(null);
            })
            .catch(err => {
                setError(err.response?.data?.message || "Error loading profile.");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, loading, error, fetchProfile };
};

export default useProfile;