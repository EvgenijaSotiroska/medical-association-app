import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./AuthPages.css";
import {useLogin} from "../../../hooks/auth/useLogin.js";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading, error } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate("/home");
        } catch (_) {
            // error handled by hook
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-logo">ЗИ</div>

                <h1 className="auth-title">Најава</h1>
                <p className="auth-subtitle">за членови и администратори</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="username">
                            Корисничко име
                        </label>
                        <input
                            id="username"
                            className="auth-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="password">
                            Лозинка
                        </label>
                        <input
                            id="password"
                            className="auth-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button
                        className="auth-btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Се најавува..." : "Најави се"}
                    </button>
                </form>

                <p className="auth-footer">
                    Нов член?{" "}
                    <Link to="/register" className="auth-link">
                        Аплицирај за членство
                    </Link>
                </p>
            </div>
        </div>
    );
}
