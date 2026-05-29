import { useEffect } from "react";
import "./MemberDetailModal.css";
import useChangeMemberProfileStatus from "../../../hooks/memberProfiles/useChangeProfileMemberStatus.js";

const Row = ({ label, value }) =>
    value ? (
        <div className="mdm__row">
            <span className="mdm__label">{label}</span>
            <span className="mdm__value">{value}</span>
        </div>
    ) : null;

export default function MemberDetailModal({ member, onClose, onStatusChange }) {
    const { changeStatus, loading } = useChangeMemberProfileStatus();

    // Close on Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const statusLabel = {
        PENDING: "На чекање",
        APPROVED: "Активен",
        REJECTED: "Одбиен",
    };

    const handleApprove = async () => {
        await changeStatus(member.id, "APPROVED");
        onStatusChange?.();
        onClose();
    };

    const handleReject = async () => {
        await changeStatus(member.id, "REJECTED");
        onStatusChange?.();
        onClose();
    };

    return (
        <div className="mdm__overlay" onClick={onClose}>
            <div className="mdm__panel" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="mdm__header">
                    <div className="mdm__avatar">
                        {member.profilePicture ? (
                            <img
                                src={member.profilePicture}
                                alt={member.firstName}
                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                            />
                        ) : (
                            <>{member.firstName?.[0]}{member.lastName?.[0]}</>
                        )}
                    </div>

                    <div className="mdm__header-text">
                        <h2 className="mdm__name">
                            {member.firstName} {member.lastName}
                        </h2>
                        <p className="mdm__subtitle">
                            {member.specialization || "—"}
                        </p>
                    </div>

                    <span className={`mdm__status mdm__status--${member.status?.toLowerCase()}`}>
                        {statusLabel[member.status] ?? member.status}
                    </span>

                    <button className="mdm__close" onClick={onClose} aria-label="Затвори">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="mdm__body">

                    <p className="mdm__section-label">Лични податоци</p>
                    <Row label="Ime" value={member.firstName} />
                    <Row label="Презиме" value={member.lastName} />
                    <Row label="Дата на раѓање" value={member.dateOfBirth} />
                    <Row label="Телефон" value={member.phone} />
                    <Row label="Адреса" value={member.address} />

                    <p className="mdm__section-label">Професионални податоци</p>
                    <Row label="Институција" value={member.institution} />
                    <Row label="Позиција" value={member.position} />
                    <Row label="Специјализација" value={member.specialization} />
                    <Row label="Подспецијализација" value={member.subSpecialization} />
                    <Row label="Број на лиценца" value={member.licenseNumber} />
                    <Row label="Година на диплома" value={member.graduationYear} />
                </div>

                {/* Actions */}
                <div className="mdm__actions">
                    {member.status === "PENDING" && (
                        <>
                            <button
                                className="mdm__btn mdm__btn--approve"
                                onClick={handleApprove}
                                disabled={loading}
                            >
                                Одобри
                            </button>

                            <button
                                className="mdm__btn mdm__btn--reject"
                                onClick={handleReject}
                                disabled={loading}
                            >
                                Одбиј
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}