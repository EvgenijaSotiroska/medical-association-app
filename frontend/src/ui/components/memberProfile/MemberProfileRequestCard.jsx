import { useState } from "react";
import MemberDetailModal from "./MemberDetailModal.jsx";
import "./MemberProfileRequestCard.css";

export default function MemberProfileRequestCard({ member , onStatusChange }) {
    const [modalOpen, setModalOpen] = useState(false);

    const statusLabel = {
        PENDING: "На чекање",
        APPROVED: "Активен",
        REJECTED: "Одбиен",
    };

    return (
        <>
            <div className="member-card" onClick={() => setModalOpen(true)}>
                <div className="member-card__avatar">
                    {member.firstName?.[0]}{member.lastName?.[0]}
                </div>

                <div className="member-card__body">
                    <h3 className="member-card__name">
                        {member.firstName} {member.lastName}
                    </h3>
                    <p className="member-card__role">{member.specialization || "—"}</p>
                    <p className="member-card__institution">{member.institution || "—"}</p>
                </div>

                <div className="member-card__footer">
                    <span className={`member-card__status member-card__status--${member.status?.toLowerCase()}`}>
                        {statusLabel[member.status] ?? member.status}
                    </span>
                    <span className="member-card__cta">Детали →</span>
                </div>
            </div>

            {modalOpen && (
                <MemberDetailModal
                    member={member}
                    onClose={() => setModalOpen(false)}
                    onStatusChange={onStatusChange}
                />
            )}
        </>
    );
}