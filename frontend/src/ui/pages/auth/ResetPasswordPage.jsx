import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import useResetPassword from "../../../hooks/auth/useResetPassword.js";
import "./AuthPages.css";

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        newPassword: "",
        confirmNewPassword: ""
    });
    const [validationError, setValidationError] = useState(null);
    const { resetPassword, loading, error, success } = useResetPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError(null);

        const errors = [];
        if (form.newPassword.length < 8) errors.push("Лозинката мора да биде подолга од 8 карактери.");
        if (!/[A-Z]/.test(form.newPassword)) errors.push("Лозинката мора да содржи барем една голема буква.");
        if (!/[a-z]/.test(form.newPassword)) errors.push("Лозинката мора да содржи барем една мала буква.");
        if (!/[0-9]/.test(form.newPassword)) errors.push("Лозинката мора да содржи барем една цифра.");
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.newPassword)) errors.push("Лозинката мора да содржи барем еден специјален знак.");
        if (form.newPassword !== form.confirmNewPassword) errors.push("Лозинките не се совпаѓаат.");

        if (errors.length > 0) {
            setValidationError(errors.join(" "));
            return;
        }

        await resetPassword({ token, ...form });
    };

    if (!token) return (
        <div className="auth-page">
            <div className="auth-card">
                <p className="auth-error">Невалиден линк за ресетирање.</p>
            </div>
        </div>
    );

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">ЗИ</div>
                <h1 className="auth-title">Нова лозинка</h1>
                <p className="auth-subtitle">Внесете нова лозинка</p>

                {success ? (
                    <div className="auth-success">
                        <p>✅ Лозинката е успешно сменета!</p>
                        <button className="auth-btn" onClick={() => navigate("/login")}>
                            Оди на најава
                        </button>
                    </div>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            type="password"
                            className="auth-input"
                            placeholder="Нова лозинка"
                            value={form.newPassword}
                            onChange={(e) => setForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            required
                        />
                        <input
                            type="password"
                            className="auth-input"
                            placeholder="Потврди нова лозинка"
                            value={form.confirmNewPassword}
                            onChange={(e) => setForm(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
                            required
                        />
                        {validationError && <p className="auth-error">{validationError}</p>}
                        {error && <p className="auth-error">{error}</p>}
                        <button className="auth-btn" type="submit" disabled={loading}>
                            {loading ? "Се зачувува..." : "Зачувај лозинка"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}