import { useState } from "react";
import { Link } from "react-router";
import useForgotPassword from "../../../hooks/auth/useForgotPassword.js";
import "./AuthPages.css";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const { forgotPassword, loading, error, success } = useForgotPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(email);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">ЗИ</div>
                <h1 className="auth-title">Заборавена лозинка</h1>
                <p className="auth-subtitle">Внесете го вашиот е-маил</p>

                {success ? (
                    <div className="auth-success">
                        <p>✅ Мејлот е испратен! Проверете го вашето сандаче.</p>
                        <Link to="/login" className="auth-link">Назад кон најава</Link>
                    </div>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="auth-input"
                            placeholder="Е-маил адреса"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && <p className="auth-error">{error}</p>}
                        <button className="auth-btn" type="submit" disabled={loading}>
                            {loading ? "Се испраќа..." : "Испрати линк"}
                        </button>
                        <p className="auth-footer">
                            <Link to="/login" className="auth-link">Назад кон најава</Link>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}