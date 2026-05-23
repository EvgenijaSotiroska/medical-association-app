import { useState } from "react";
import profileApi from "../../api/profileApi.js";

const useUpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updatePassword = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await profileApi.updatePassword(data);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Error updating password.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updatePassword, loading, error, success };
};

export default useUpdatePassword;