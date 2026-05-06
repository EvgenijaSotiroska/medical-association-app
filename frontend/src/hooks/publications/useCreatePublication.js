import { useState } from "react";
import publicationApi from "../../api/publicationApi.js";

const useCreatePublication = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createPublication = async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await publicationApi.create(data);
            setSuccess(true);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || "Error creating publication.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createPublication, loading, error, success };
};

export default useCreatePublication;