import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    const [moreOpen, setMoreOpen] = useState(false);

    return (
        <div style={containerStyle}>
            {/* Hero Section */}
            <div style={heroStyle}>
                <h1 style={heroTitle}>
                    Generate Notes, Quizzes & Flashcards with AI
                </h1>

                <p style={heroText}>
                    Smart Notes helps you capture thoughts, summarize content,
                    and create quizzes effortlessly.
                </p>

                <Link to="/register" style={getStartedButton}>
                    Get Started for Free
                </Link>
            </div>

            {/* Features Section */}
            <section style={featuresSection}>
                <Link to="/flashcards"><FeatureCard
                    title="Create Flashcards"
                    description="Turn your notes into AI-generated flashcards for quick revision."
                /></Link>
                <Link to="/notes"><FeatureCard
                    title="Generate Notes with AI"
                    description="Get concise Notes for smart studying."
                    
                /></Link>
                <Link to="/generatequiz"><FeatureCard
                    title="Generate Quiz"
                    description="Test your knowledge with AI-generated quizzes."
                /></Link>
                <Link to="/revision"><FeatureCard
                    title="Revision"
                    description="Organize learning with smart revision plans."
                /></Link>
            </section>
        </div>
    );
}

/* ---------------- FEATURE CARD ---------------- */

function FeatureCard({ title, description }) {
    return (
        <div
            style={cardStyle}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
            <h3 style={{ marginBottom: "12px" }}>{title}</h3>
            <p style={{ opacity: 0.8 }}>{description}</p>
        </div>
    );
}

/* ---------------- STYLES ---------------- */

const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "80px 20px",
    color: "white",
};

const heroStyle = {
    textAlign: "center",
    marginBottom: "80px",
};

const heroTitle = {
    fontSize: "3rem",
    fontWeight: 700,
    marginBottom: "20px",
};

const heroText = {
    fontSize: "1.2rem",
    opacity: 0.85,
    maxWidth: "700px",
    margin: "0 auto 30px auto",
};

const getStartedButton = {
    padding: "14px 40px",
    borderRadius: "12px",
    background: "#4f46e5",
    color: "white",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
};

const featuresSection = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
};

const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "18px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    transition: "0.3s ease",
};