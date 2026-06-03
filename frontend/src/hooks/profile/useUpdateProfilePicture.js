import { useState } from "react";
import profileApi from "../../api/profileApi.js";

const useUpdateProfilePicture = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProfilePicture = async (file) => {
        if (!file) return;
        setLoading(true);
        setError(null);
        try {
            const res = await profileApi.updateProfilePicture(file);
            return res.data;
        } catch (err) {
            setError(err.response?.data?.message ?? "Грешка при прикачување.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateProfilePicture, loading, error };
};

export default useUpdateProfilePicture;