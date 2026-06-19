import { useEffect, useState, useCallback } from "react";
import memberProfileApi from "../../api/memberProfileApi.js";

const initialState = {
    memberProfilesPending: [],
    loading: true,
    error: null
};

const usePendingMemberProfiles = (enabled = true) => {
    const [state, setState] = useState(initialState);

    const fetchPending = useCallback(() => {
        if (!enabled) return;   // ← don't fetch if not admin

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
                setState({
                    memberProfilesPending: [],
                    loading: false,
                    error
                });
            });
    }, [enabled]);   // ← re-run when enabled changes

    useEffect(() => {
        fetchPending();
    }, [fetchPending]);

    return { ...state, fetchPending };
};

export default usePendingMemberProfiles;