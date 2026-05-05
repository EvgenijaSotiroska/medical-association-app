import { useState } from 'react';
import memberProfileApi from "../../api/memberProfileApi.js";

const useChangeMemberProfileStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const changeStatus = async (id, status) => {
        setLoading(true);
        setError(null);

        try {
            const response = await memberProfileApi.changeStatus(id, status);
            return response.data; // updated profile
        } catch (err) {
            console.error(err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        changeStatus,
        loading,
        error
    };
};

export default useChangeMemberProfileStatus;