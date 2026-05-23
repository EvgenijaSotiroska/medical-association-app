import { useState } from "react";
import profileApi from "../../api/profileApi.js";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateProfile = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await profileApi.updateProfile(data);
            setSuccess(true);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.message || "Error updating profile.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateProfile, loading, error, success };
};

export default useUpdateProfile;