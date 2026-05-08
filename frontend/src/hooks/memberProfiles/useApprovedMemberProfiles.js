import { useEffect, useState } from 'react';
import memberProfileApi from "../../api/memberProfileApi.js";

const useApprovedMemberProfiles = () => {
    const [approvedMembers, setApprovedMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApproved = () => {
        memberProfileApi
            .findAllApproved()
            .then((response) => {
                setApprovedMembers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setApprovedMembers([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchApproved();
    }, []);

    return { approvedMembers, loading, refetch: fetchApproved };
};

export default useApprovedMemberProfiles;