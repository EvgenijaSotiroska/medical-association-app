import {useState, useEffect} from "react";
import {Link, useNavigate, useLocation} from "react-router";
import './Header.css';
import { jwtDecode } from "jwt-decode";
import {getUserRole} from "../../../../utils/auth.js";
import usePendingMemberProfiles from "../../../../hooks/memberProfiles/usePendingMemberProfiles.js";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem("token");

    let isAuthenticated = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp > currentTime) {
                isAuthenticated = true;
            } else {
                localStorage.removeItem("token");
            }
        } catch (e) {
            localStorage.removeItem("token");
        }
    }

    const role = getUserRole();
    const isAdmin = role === "ROLE_ADMINISTRATOR";

    const { memberProfilesPending, fetchPending } = usePendingMemberProfiles(isAdmin);

    useEffect(() => {
        if (isAdmin) fetchPending();
    }, [location.pathname]);

    const pendingCount = memberProfilesPending.length;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("memberId");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const isActive = (path) => location.pathname === path ? "nav-link--active" : "";

    return (
        <>
            <header className="navbar">
                <div className="navbar-brand">
                    Здружение на интернисти
                </div>

                <nav className="nav-links">
                    <Link to="/" className={isActive("/")}>Почетна</Link>
                    {!isAuthenticated && (
                        <Link to="/register" className={isActive("/register")}>Членство</Link>
                    )}
                    {isAuthenticated && isAdmin && (
                        <>
                            <Link to="/create-event" className={isActive("/create-event")}>Креирај настан</Link>
                            <Link to="/create-publication" className={isActive("/create-publication")}>Креирај објава</Link>
                            <Link to="/memberRequests" className={isActive("/memberRequests")} style={{ position: "relative" }}>
                                Барања за членство
                                {pendingCount > 0 && (
                                    <span className="nav-badge">{pendingCount}</span>
                                )}
                            </Link>
                            <Link to="/approvedMembers" className={isActive("/approvedMembers")}>Одобрени членови</Link>
                        </>
                    )}
                    {isAuthenticated && (
                        <>
                            <Link to="/announcements" className={isActive("/announcements")}>Соопштенија</Link>
                            <Link to="/my-events" className={isActive("/my-events")}>Мои настани</Link>
                            <Link to="/profile" className={isActive("/profile")}>Мој профил</Link>
                        </>
                    )}
                </nav>

                {isAuthenticated ? (
                    <button className="btn-primary" onClick={handleLogout}>
                        Одјави се
                    </button>
                ) : (
                    <Link to="/login" className="btn-primary">
                        Најава
                    </Link>
                )}

                <button
                    className={`nav-hamburger ${menuOpen ? "is-open" : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Мени"
                >
                    <span/>
                    <span/>
                    <span/>
                </button>
            </header>

            <nav className={`nav-mobile-drawer ${menuOpen ? "open" : ""}`}>
                <Link to="/" className={isActive("/")} onClick={() => setMenuOpen(false)}>Почетна</Link>
                {!isAuthenticated && (
                    <Link to="/register" className={isActive("/register")} onClick={() => setMenuOpen(false)}>Членство</Link>
                )}
                {isAuthenticated && isAdmin && (
                    <>
                        <Link to="/create-event" className={isActive("/create-event")} onClick={() => setMenuOpen(false)}>Креирај настан</Link>
                        <Link to="/create-publication" className={isActive("/create-publication")} onClick={() => setMenuOpen(false)}>Креирај објава</Link>
                        <Link to="/memberRequests" className={isActive("/memberRequests")} style={{ position: "relative" }} onClick={() => setMenuOpen(false)}>
                            Барања за членство
                            {pendingCount > 0 && (
                                <span className="nav-badge">{pendingCount}</span>
                            )}
                        </Link>
                        <Link to="/approvedMembers" className={isActive("/approvedMembers")} onClick={() => setMenuOpen(false)}>Одобрени членови</Link>
                    </>
                )}
                {isAuthenticated && (
                    <>
                        <Link to="/announcements" className={isActive("/announcements")} onClick={() => setMenuOpen(false)}>Соопштенија</Link>
                        <Link to="/my-events" className={isActive("/my-events")} onClick={() => setMenuOpen(false)}>Мои настани</Link>
                        <Link to="/profile" className={isActive("/profile")} onClick={() => setMenuOpen(false)}>Мој профил</Link>
                    </>
                )}
                {isAuthenticated ? (
                    <button
                        className="btn-primary"
                        onClick={() => { handleLogout(); setMenuOpen(false); }}
                    >
                        Одјави се
                    </button>
                ) : (
                    <Link to="/login" className="btn-primary" style={{ color: 'white' }} onClick={() => setMenuOpen(false)}>
                        Најава
                    </Link>
                )}
            </nav>
        </>
    );
}