import { useState } from "react";
import "./MemberProfileRequestsPage.css";
import MemberProfileRequestCard from "../../components/memberProfile/MemberProfileRequestCard.jsx";
import usePendingMemberProfiles from "../../../hooks/memberProfiles/usePendingMemberProfiles.js";

export default function MemberProfileRequestsPage() {
    const { memberProfilesPending, loading, error, fetchPending } = usePendingMemberProfiles();
    const [search, setSearch] = useState("");

    const filtered = memberProfilesPending?.filter((m) =>
        `${m.firstName} ${m.lastName} ${m.institution} ${m.specialization}`
            .toLowerCase()
            .includes(search.toLowerCase())
    ) ?? [];


    return (
        <div className="members-page">
            <div className="members-page__header">
                <div>
                    <h1 className="members-page__title">Барања за членство</h1>
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
            {error   && <div className="members-page__empty">Грешка при вчитување.</div>}

            {!loading && !error && filtered.length === 0 && (
                <div className="members-page__empty">Нема барања на чекање.</div>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div className="members-page__grid">
                    {filtered.map((m) => (
                        <MemberProfileRequestCard
                            key={m.id}
                            member={m}
                            onStatusChange={fetchPending}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}