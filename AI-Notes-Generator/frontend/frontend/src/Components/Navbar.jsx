import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
    const [moreOpen, setMoreOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav style={navbar}>
            {/* Left: Logo + main nav */}
            <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
                <h1 style={logo}>Smart Notes</h1>

                {/* Main nav options */}
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                    <Link to="/" style={navLink}>Home</Link>
                    <div style={{ position: "relative" }}>
                        <button onClick={() => setMoreOpen(!moreOpen)} style={navLink}>
                            More ▾
                        </button>
                        {moreOpen && (
                            <div style={dropdown}>
                                <Link to="/notes" style={navLink}>Generate Notes</Link>
                                <Link to="/flashcards" style={navLink}>Flashcards</Link>
                                <Link to="/generatequiz" style={navLink}>Quiz</Link>
                                <Link to="/revision" style={navLink}>Revision</Link>
                                <Link to="/dashboard" style={navLink}>Dashboard</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Profile + Logout */}
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <div style={profileCard}>
                    <img
                        src={user?.avatar || "/default-avatar.png"}
                        alt="avatar"
                        style={avatarStyle}
                    />
                    <span>{user?.email}</span>
                </div>
                <button onClick={handleLogout} style={logoutButton}>Logout</button>
            </div>
        </nav>
    );
}

// Styles
const navbar = {
    width: "100%",
    padding: "12px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
};

const logo = { fontWeight: 700, fontSize: "1.5rem", cursor: "pointer" };

const navLink = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    padding: "5px 8px",
    cursor: "pointer",
    transition: "0.2s",
    ":hover": { color: "#818cf8" }
};

const dropdown = {
    position: "absolute",
    top: "120%",
    left: 0,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
};

const profileCard = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "5px 10px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "8px",
};

const avatarStyle = {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    objectFit: "cover",
};

const logoutButton = {
    padding: "8px 15px",
    borderRadius: "8px",
    background: "#f87171",
    border: "none",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
};