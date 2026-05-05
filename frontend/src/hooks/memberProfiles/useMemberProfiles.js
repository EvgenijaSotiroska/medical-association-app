import { useEffect, useState } from 'react';
import memberProfileApi from "../../api/memberProfileApi.js";

const initialState = {
    memberProfiles: [],
    loading: true
};

const useMemberProfiles = () => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        memberProfileApi
            .findAll()
            .then((response) => {
                setState({
                    memberProfiles: response.data,
                    loading: false
                });
            })
            .catch((error) => {
                    console.log(error);
                    setState({
                        memberProfiles: [],
                        loading: false
                    });
                }
            );
    }, []);

    return state;
};

export default useMemberProfiles;
