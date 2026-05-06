import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useEvents from "../../../hooks/events/useEvents.js";
import usePublications from "../../../hooks/publications/usePublications.js";
import "./AnnouncementsPage.css";

const FILTERS = [
    { label: "Сите", value: "All" },
    { label: "Конгреси", value: "CONGRESS" },
    { label: "Семинари", value: "SEMINAR" },
    { label: "Документи", value: "DOCUMENT" },
    { label: "Новости", value: "NEWS" },
];

export default function AnnouncementsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeFilter = searchParams.get("filter") || "All";

    const { events, loading: eventsLoading } = useEvents();
    const { publications, loading: publicationsLoading } = usePublications();
    const navigate = useNavigate();

    const loading = eventsLoading || publicationsLoading;

    const allItems = [
        ...events.map(e => ({ ...e, category: "EVENT" })),
        ...publications.map(p => ({ ...p, category: "PUBLICATION" }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const filtered = allItems.filter(item => {
        if (activeFilter === "All") return true;
        return item.type === activeFilter;
    });

    const handleFilterChange = (value) => {
        if (value === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ filter: value });
        }
    };

    const handleCardClick = (item) => {
        if (item.category === "EVENT") {
            navigate(`/announcements/event/${item.id}`);
        } else {
            navigate(`/announcements/publication/${item.id}`);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleDateString("mk-MK");
    };

    const typeLabel = {
        CONGRESS: "Конгрес",
        SEMINAR: "Семинар",
        DOCUMENT: "Документ",
        NEWS: "Новост"
    };

    return (
        <div className="ann-page">
            <div className="ann-hero">
                <p className="ann-hero__sup">ИНФОРМАЦИИ</p>
                <h1 className="ann-hero__title">Соопштенија и настани</h1>
                <p className="ann-hero__sub">
                    Најнови известувања за конгреси, семинари, правилници и новости од работата на здружението.
                </p>
            </div>

            <div className="ann-filters">
                {FILTERS.map(f => (
                    <button
                        key={f.value}
                        className={`ann-filter-btn ${activeFilter === f.value ? "active" : ""}`}
                        onClick={() => handleFilterChange(f.value)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {loading && <div className="ann-empty">Се вчитува...</div>}
            {!loading && filtered.length === 0 && (
                <div className="ann-empty">Нема соопштенија.</div>
            )}

            {!loading && filtered.length > 0 && (
                <div className="ann-grid">
                    {filtered.map(item => (
                        <div
                            key={`${item.category}-${item.id}`}
                            className="ann-card"
                            onClick={() => handleCardClick(item)}
                        >
                            <div className="ann-card__img-wrapper">
                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="ann-card__img"
                                    />
                                ) : (
                                    <div className="ann-card__img-placeholder" />
                                )}
                            </div>

                            <div className="ann-card__body">
                                <div className="ann-card__meta">
                                    <span className={`ann-card__type ann-card__type--${item.type?.toLowerCase()}`}>
                                        {typeLabel[item.type] ?? item.type}
                                    </span>
                                    {(item.eventDate || item.createdAt) && (
                                        <span className="ann-card__date">
                                            📅 {formatDate(item.eventDate ?? item.createdAt)}
                                        </span>
                                    )}
                                </div>

                                <h3 className="ann-card__title">{item.title}</h3>
                                <p className="ann-card__desc">{item.description}</p>

                                {item.authorName && (
                                    <p className="ann-card__author">👤 {item.authorName}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}