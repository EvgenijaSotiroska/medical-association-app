import { useState, useEffect } from "react";
import useProfile from "../../../hooks/profile/useProfile.js";
import useUpdateProfile from "../../../hooks/profile/useUpdateProfile.js";
import useUpdatePassword from "../../../hooks/profile/useUpdatePassword.js";
import useUpdateEmail from "../../../hooks/profile/useUpdateEmail.js";
import "./ProfilePage.css";

export default function ProfilePage() {
    const { profile, loading, error, fetchProfile } = useProfile();
    const { updateProfile, loading: updatingProfile, error: profileError, success: profileSuccess } = useUpdateProfile();
    const { updatePassword, loading: updatingPassword, error: passwordError, success: passwordSuccess } = useUpdatePassword();
    const { updateEmail, loading: updatingEmail, error: emailError, success: emailSuccess } = useUpdateEmail();

    const [profileForm, setProfileForm] = useState(null);
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [emailForm, setEmailForm] = useState({ newEmail: "" });
    const [passwordValidationError, setPasswordValidationError] = useState(null);

    useEffect(() => {
        if (profile) {
            setProfileForm({
                firstName: profile.firstName ?? "",
                lastName: profile.lastName ?? "",
                dateOfBirth: profile.dateOfBirth ?? "",
                phone: profile.phone ?? "",
                address: profile.address ?? "",
                institution: profile.institution ?? "",
                position: profile.position ?? "",
                specialization: profile.specialization ?? "",
                subSpecialization: profile.subSpecialization ?? "",
                licenseNumber: profile.licenseNumber ?? "",
                graduationYear: profile.graduationYear ?? ""
            });
            setEmailForm({ newEmail: profile.email ?? "" });
        }
    }, [profile]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(profileForm);
            fetchProfile();
        } catch (_) {}
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordValidationError(null);

        const errors = [];

        if (passwordForm.newPassword.length < 8) {
            errors.push("Лозинката мора да биде подолга од 8 карактери.");
        }
        if (!/[A-Z]/.test(passwordForm.newPassword)) {
            errors.push("Лозинката мора да содржи барем една голема буква.");
        }
        if (!/[a-z]/.test(passwordForm.newPassword)) {
            errors.push("Лозинката мора да содржи барем една мала буква.");
        }
        if (!/[0-9]/.test(passwordForm.newPassword)) {
            errors.push("Лозинката мора да содржи барем една цифра.");
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordForm.newPassword)) {
            errors.push("Лозинката мора да содржи барем еден специјален знак.");
        }
        if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
            errors.push("Лозинките не се совпаѓаат.");
        }

        if (errors.length > 0) {
            setPasswordValidationError(errors.join(" "));
            return;
        }

        try {
            await updatePassword(passwordForm);
            setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
        } catch (_) {}
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmail(emailForm);
            fetchProfile();
        } catch (_) {}
    };

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/profile/picture", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
        if (res.ok) {
            fetchProfile();
        }
    };

    if (loading) return <div className="profile-empty">Се вчитува...</div>;
    if (error) return <div className="profile-empty">{error}</div>;
    if (!profile || !profileForm) return null;

    return (
        <div className="profile-page">

            {/* Header */}
            <div className="profile-header">
                <div className="profile-avatar" onClick={() => document.getElementById('avatarInput').click()}
                     style={{cursor: 'pointer'}}>
                    {profile.profilePicture
                        ? <img src={profile.profilePicture} alt="avatar"
                               style={{width:'100%', height:'100%', borderRadius:'50%', objectFit:'cover'}} />
                        : <>{profile.firstName?.[0]}{profile.lastName?.[0]}</>
                    }
                    <input id="avatarInput" type="file" accept="image/*"
                           style={{display:'none'}} onChange={handleAvatarUpload} />
                </div>
                <div>
                    <h1 className="profile-name">{profile.firstName} {profile.lastName}</h1>
                    <p className="profile-role">
                        {profile.role === "ROLE_ADMINISTRATOR" ? "Администратор" : "Член"}
                    </p>
                    <p className="profile-username">@{profile.username}</p>
                </div>
            </div>

            {/* Section 1 — Лични и професионални податоци */}
            <div className="profile-card">
                <h2 className="profile-card__title">Лични и професионални податоци</h2>
                <form onSubmit={handleProfileSubmit} className="profile-form">
                    <h3 className="profile-form__section">Лични податоци</h3>
                    <div className="profile-row">
                        <div className="profile-field">
                            <label className="profile-label">Име</label>
                            <input name="firstName" className="profile-input" value={profileForm.firstName} onChange={handleProfileChange} />
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Презиме</label>
                            <input name="lastName" className="profile-input" value={profileForm.lastName} onChange={handleProfileChange} />
                        </div>
                    </div>
                    <div className="profile-field">
                        <label className="profile-label">Датум на раѓање</label>
                        <input type="date" name="dateOfBirth" className="profile-input" value={profileForm.dateOfBirth} onChange={handleProfileChange} />
                    </div>
                    <div className="profile-row">
                        <div className="profile-field">
                            <label className="profile-label">Телефон</label>
                            <input name="phone" className="profile-input" value={profileForm.phone} onChange={handleProfileChange} />
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Адреса</label>
                            <input name="address" className="profile-input" value={profileForm.address} onChange={handleProfileChange} />
                        </div>
                    </div>
                    <h3 className="profile-form__section">Професионални податоци</h3>
                    <div className="profile-field">
                        <label className="profile-label">Здравствена установа</label>
                        <input name="institution" className="profile-input" value={profileForm.institution} onChange={handleProfileChange} />
                    </div>
                    <div className="profile-row">
                        <div className="profile-field">
                            <label className="profile-label">Позиција</label>
                            <input name="position" className="profile-input" value={profileForm.position} onChange={handleProfileChange} />
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Специјализација</label>
                            <input name="specialization" className="profile-input" value={profileForm.specialization} onChange={handleProfileChange} />
                        </div>
                    </div>
                    <div className="profile-row">
                        <div className="profile-field">
                            <label className="profile-label">Подспецијализација</label>
                            <input name="subSpecialization" className="profile-input" value={profileForm.subSpecialization} onChange={handleProfileChange} />
                        </div>
                        <div className="profile-field">
                            <label className="profile-label">Број на лиценца</label>
                            <input name="licenseNumber" className="profile-input" value={profileForm.licenseNumber} onChange={handleProfileChange} />
                        </div>
                    </div>
                    <div className="profile-field">
                        <label className="profile-label">Година на дипломирање</label>
                        <input type="number" name="graduationYear" className="profile-input" value={profileForm.graduationYear} onChange={handleProfileChange} />
                    </div>
                    {profileError && <p className="profile-error">{profileError}</p>}
                    {profileSuccess && <p className="profile-success">✅ Податоците се зачувани!</p>}
                    <button className="profile-btn" type="submit" disabled={updatingProfile}>
                        {updatingProfile ? "Се зачувува..." : "Зачувај промени"}
                    </button>
                </form>
            </div>

            {/* Section 2 — Промена на е-пошта */}
            <div className="profile-card">
                <h2 className="profile-card__title">Промена на е-пошта</h2>
                <form onSubmit={handleEmailSubmit} className="profile-form">
                    <div className="profile-field">
                        <label className="profile-label">Нова е-пошта</label>
                        <input
                            type="email"
                            name="newEmail"
                            className="profile-input"
                            value={emailForm.newEmail}
                            onChange={(e) => setEmailForm({ newEmail: e.target.value })}
                            required
                        />
                    </div>
                    {emailError && <p className="profile-error">{emailError}</p>}
                    {emailSuccess && <p className="profile-success">✅ Е-поштата е сменета!</p>}
                    <button className="profile-btn" type="submit" disabled={updatingEmail}>
                        {updatingEmail ? "Се зачувува..." : "Смени е-пошта"}
                    </button>
                </form>
            </div>

            {/* Section 3 — Промена на лозинка */}
            <div className="profile-card">
                <h2 className="profile-card__title">Промена на лозинка</h2>
                <form onSubmit={handlePasswordSubmit} className="profile-form">
                    <div className="profile-field">
                        <label className="profile-label">Тековна лозинка</label>
                        <input
                            type="password"
                            name="currentPassword"
                            className="profile-input"
                            value={passwordForm.currentPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="profile-field">
                        <label className="profile-label">Нова лозинка</label>
                        <input
                            type="password"
                            name="newPassword"
                            className="profile-input"
                            value={passwordForm.newPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="profile-field">
                        <label className="profile-label">Потврди нова лозинка</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            className="profile-input"
                            value={passwordForm.confirmNewPassword}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    {passwordValidationError && (
                        <p className="profile-error">{passwordValidationError}</p>
                    )}
                    {passwordError && <p className="profile-error">{passwordError}</p>}
                    {passwordSuccess && <p className="profile-success">✅ Лозинката е сменета!</p>}
                    <button className="profile-btn" type="submit" disabled={updatingPassword}>
                        {updatingPassword ? "Се зачувува..." : "Смени лозинка"}
                    </button>
                </form>
            </div>

        </div>
    );
}