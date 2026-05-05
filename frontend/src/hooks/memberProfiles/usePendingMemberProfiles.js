import { useEffect, useState, useCallback } from "react";
import memberProfileApi from "../../api/memberProfileApi.js";

const initialState = {
    memberProfilesPending: [],
    loading: true,
    error: null
};

const usePendingMemberProfiles = () => {
    const [state, setState] = useState(initialState);

    const fetchPending = useCallback(() => {
        setState(prev => ({ ...prev, loading: true }));

        memberProfileApi
            .findAllPending()
            .then((response) => {
                setState({
                    memberProfilesPending: response.data,
                    loading: false,
                    error: null
                });
            })
            .catch((error) => {
                console.log(error);
                setState({
                    memberProfilesPending: [],
                    loading: false,
                    error
                });
            });
    }, []);

    useEffect(() => {
        fetchPending();
    }, [fetchPending]);

    return { ...state, fetchPending };
};

export default usePendingMemberProfiles;