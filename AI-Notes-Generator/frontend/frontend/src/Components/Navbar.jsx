import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <nav
            style={{
                width: "100%",
                padding: "15px 20px",
                display: "flex",
                flexWrap: "wrap", // allows items to wrap on small screens
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                boxSizing: "border-box",
                color: "white",
            }}
        >
            {/* Left: Logo + Main Nav */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                <h1 style={{ fontWeight: 700, fontSize: "1.5rem", margin: 0 }}>
                    Smart Notes
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Link to="/" style={navLinkStyle}>Home</Link>
                    <Link to="/flashcards" style={navLinkStyle}>Flashcards</Link>
                    <Link to="/notes" style={navLinkStyle}>Generate Notes</Link>

                    {/* More dropdown */}
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => setMoreOpen(!moreOpen)}
                            style={moreButtonStyle}
                        >
                            More ▾
                        </button>

                        {moreOpen && (
                            <div style={dropdownStyle}>
                                <Link to="/generatequiz" style={navLinkStyle}>Generate Quiz</Link>
                                <Link to="/revision" style={navLinkStyle}>Revision</Link>
                                <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: login/register */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link to="/login" style={authLinkStyle}>Login</Link>
                <Link to="/register" style={authLinkStyle}>Register</Link>
            </div>
        </nav>
    );
}

/* ---------- Styles ---------- */
const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    padding: "5px 8px",
    whiteSpace: "nowrap", // prevents wrapping inside link
};

const authLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    padding: "8px 15px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.1)",
    transition: "0.3s ease",
    cursor: "pointer",
    whiteSpace: "nowrap",
};

const moreButtonStyle = {
    padding: "6px 12px",
    borderRadius: "8px",
    background: "#4f46e5",
    color: "white",
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    transition: "0.3s ease, transform 0.2s ease",
};

const dropdownStyle = {
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
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    zIndex: 1000,
};