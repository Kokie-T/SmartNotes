import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%", // full viewport width
                margin: 0,
                padding: 0,
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
                color: "white",
                fontFamily: "'Segoe UI', sans-serif",
                overflowX: "hidden"
            }}
        >
            {/* Navbar */}
            <nav
                style={{
                    width: "100%",
                    padding: "15px 20px",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    flexWrap: "wrap",
				
                }}
            >
                {/* Left: Logo + main nav */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Smart Notes</h1>

                    <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
                        <Link to="/" style={navLinkStyle}>Home</Link>
                        <Link to="/flashcards" style={navLinkStyle}>Flashcards</Link>
                        <Link to="/summarize" style={navLinkStyle}>Summarize</Link>

                        {/* More dropdown */}
                        <div style={{ position: "relative" }}>
                            <button
                                onClick={() => setMoreOpen(!moreOpen)}
                                style={navLinkStyle}
                            >
                                More ▾
                            </button>
                            {moreOpen && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "120%",
                                        left: 0,
                                        background: "rgba(260,255,255,0.08)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: "8px",
                                        padding: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                        boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
                                    }}
                                >
                                    <Link to="/quiz" style={navLinkStyle}>Quiz</Link>
                                    <Link to="/revision" style={navLinkStyle}>Revision</Link>
                                    <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: login/register */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Link to="/login" style={authLinkStyle}>Login</Link>
                    <Link to="/register" style={authLinkStyle}>Register</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "80px 20px"
                }}
            >
                <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "20px" }}>
                    Generate Notes, Quizzes & Flashcards with AI
                </h1>
                <p style={{ fontSize: "1.2rem", opacity: 0.8, marginBottom: "30px", maxWidth: "700px" }}>
                    Smart Notes helps you capture thoughts, summarize content, and create quizzes effortlessly.
                </p>
                <Link to="/register" style={getStartedButton}>
                    Get Started for Free
                </Link>
            </div>

            {/* Features Section */}
            <section
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    padding: "60px 50px",
                    width: "100%",
                    maxWidth: "1400px",
                    margin: "0 auto"
                }}
            >
                <FeatureCard title="Create Flashcards" description="Turn your notes into AI-generated flashcards for quick revision." />
                <FeatureCard title="Summarize with AI" description="Get concise summaries from long notes or lectures instantly." />
                <FeatureCard title="Generate Quiz" description="Test your knowledge with AI-generated quizzes based on your notes." />
                <FeatureCard title="Revision" description="Organize and schedule your learning with smart revision plans." />
            </section>
        </div>
    );
}

// Feature card
function FeatureCard({ title, description }) {
    return (
        <div
            style={{
                background: "rgba(255,255,255,0.06)",
                padding: "25px",
                borderRadius: "18px",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                color: "white",
                textAlign: "center"
            }}
        >
            <h3 style={{ fontWeight: 600, marginBottom: "12px" }}>{title}</h3>
            <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{description}</p>
        </div>
    );
}

// Styles
const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    transition: "0.3s",
    cursor: "pointer",
    padding: "5px 8px"
};

const authLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    padding: "8px 15px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.1)",
    transition: "0.3s ease",
    cursor: "pointer"
};

const getStartedButton = {
    padding: "15px 40px",
    borderRadius: "12px",
    background: "#4f46e5",
    color: "white",
    fontWeight: 600,
    textDecoration: "none",
    transition: "0.3s ease",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)"
};