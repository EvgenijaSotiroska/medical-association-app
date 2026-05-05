import { useState } from "react";
import { Link, useNavigate } from "react-router";
import './Header.css';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <>
            <header className="navbar">
                <div className="navbar-brand">
                    Здружение на интернисти
                </div>

                {/* Desktop nav */}
                <nav className="nav-links">
                    <Link to="/">Почетна</Link>
                    <Link to="/announcements">Соопштенија</Link>
                    <Link to="/register">Членство</Link>
                    <Link to="/apply">Пријава за настан</Link>
                </nav>

                {/* Auth button */}
                {isAuthenticated ? (
                    <button className="btn-primary" onClick={handleLogout}>
                        Одјави се
                    </button>
                ) : (
                    <Link to="/" className="btn-primary">
                        Најава
                    </Link>
                )}

                {/* Hamburger */}
                <button
                    className={`nav-hamburger ${menuOpen ? "is-open" : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Мени"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </header>

            {/* Mobile menu */}
            <nav className={`nav-mobile-drawer ${menuOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setMenuOpen(false)}>Почетна</Link>
                <Link to="/announcements" onClick={() => setMenuOpen(false)}>Соопштенија</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Членство</Link>
                <Link to="/apply" onClick={() => setMenuOpen(false)}>Пријава за настан</Link>

                {isAuthenticated ? (
                    <button
                        className="btn-primary"
                        onClick={() => {
                            handleLogout();
                            setMenuOpen(false);
                        }}
                    >
                        Одјави се
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="btn-primary"
                        onClick={() => setMenuOpen(false)}
                    >
                        Најава
                    </Link>
                )}
            </nav>
        </>
    );
}