import { useState } from "react";
import "./ApprovedMembersPage.css";
import MemberProfileRequestCard from "../../components/memberProfile/MemberProfileRequestCard.jsx";
import useApprovedMemberProfiles from "../../../hooks/memberProfiles/useApprovedMemberProfiles.js";

export default function ApprovedMembersPage() {
    const { approvedMembers, loading, refetch } = useApprovedMemberProfiles();
    const [search, setSearch] = useState("");

    const filtered = approvedMembers?.filter((m) =>
        `${m.firstName} ${m.lastName} ${m.institution} ${m.specialization}`
            .toLowerCase()
            .includes(search.toLowerCase())
    ) ?? [];

    return (
        <div className="members-page">
            <div className="members-page__header">
                <div>
                    <h1 className="members-page__title">Одобрени членови</h1>
                    <p className="members-page__subtitle">
                        Здружение на интернисти на Република Северна Македонија
                    </p>
                </div>
            </div>

            <div className="members-page__filters">
                <input
                    className="members-page__search"
                    type="text"
                    placeholder="Пребарај по име, институција..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading && <div className="members-page__empty">Се вчитува...</div>}

            {!loading && filtered.length === 0 && (
                <div className="members-page__empty">Нема одобрени членови.</div>
            )}

            {!loading && filtered.length > 0 && (
                <div className="members-page__grid">
                    {filtered.map((m) => (
                        <MemberProfileRequestCard
                            key={m.id}
                            member={m}
                            onStatusChange={refetch}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}