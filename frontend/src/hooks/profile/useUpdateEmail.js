import { useState } from "react";
import profileApi from "../../api/profileApi.js";

const useUpdateEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateEmail = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await profileApi.updateEmail(data);
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || "Error updating email.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateEmail, loading, error, success };
};

export default useUpdateEmail;