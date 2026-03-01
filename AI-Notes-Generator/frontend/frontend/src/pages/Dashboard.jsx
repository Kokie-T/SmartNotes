import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FileText, BookOpen, ClipboardList, Clock } from "lucide-react";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        API.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setUser(res.data))
            .catch(() => navigate("/login"));
    }, []);

    return (
        <div style={containerStyle}>
            {/* Intro */}
            <div style={introWrapper}>
                <h1 style={introTitle}>
                    Welcome, {user?.email || "User"}!
                </h1>
                <p style={introText}>
                    Use your dashboard to generate AI-powered notes, quizzes,
                    flashcards, and revision schedules effortlessly.
                </p>
            </div>

            {/* Feature Cards */}
            <div style={cardsContainer}>
                <FeatureCard
                    icon={<FileText size={32} />}
                    title="Generate Notes"
                    description="Create structured AI-powered notes instantly."
                    link="/notes"
                />
                <FeatureCard
                    icon={<BookOpen size={32} />}
                    title="Flashcards"
                    description="Turn topics into interactive flashcards."
                    link="/flashcards"
                />
                <FeatureCard
                    icon={<ClipboardList size={32} />}
                    title="Generate Quiz"
                    description="Test yourself with AI-generated quizzes."
                    link="/generatequiz"
                />
                <FeatureCard
                    icon={<Clock size={32} />}
                    title="Revision"
                    description="Generate structured revision notes with questions."
                    link="/revision"
                />
            </div>
        </div>
    );
}

// Feature Card Component
function FeatureCard({ icon, title, description, link }) {
    return (
        <div style={cardStyle}>
            <div style={{ marginBottom: "15px" }}>{icon}</div>
            <h3 style={{ marginBottom: "10px" }}>{title}</h3>
            <p style={{ opacity: 0.8, marginBottom: "20px" }}>
                {description}
            </p>
            <Link to={link} style={cardButton}>
                Open
            </Link>
        </div>
    );
}

/* ---------------- STYLES ---------------- */

const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    color: "white",
};

const introWrapper = {
    textAlign: "center",
    marginBottom: "50px",
};

const introTitle = {
    fontSize: "2.4rem",
    fontWeight: 700,
    marginBottom: "15px",
};

const introText = {
    fontSize: "1.1rem",
    opacity: 0.85,
};

const cardsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "25px",
};

const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "18px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "0.3s ease",
};

const cardButton = {
    padding: "10px 20px",
    borderRadius: "10px",
    background: "#4f46e5",
    color: "white",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
};