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

        API.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setUser(res.data))
            .catch(() => navigate("/login"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={dashboardWrapper}>

            {/* Navbar */}
            <nav style={navbarStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                    <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Smart Notes</h1>
                    <Link to="/" style={navLinkStyle}>Home</Link>
                    <Link to="/notes" style={navLinkStyle}>Notes</Link>
                    <Link to="/flashcards" style={navLinkStyle}>Flashcards</Link>
                    <Link to="/quiz" style={navLinkStyle}>Quiz</Link>
                    <Link to="/revision" style={navLinkStyle}>Revision</Link>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    {user && <span style={{ fontWeight: 500 }}>{user.email}</span>}
                    <button onClick={handleLogout} style={logoutButton}>Logout</button>
                </div>
            </nav>

            {/* Intro */}
            <div style={introWrapper}>
                <h1 style={introTitle}>
                    Welcome, {user?.email || "User"}!
                </h1>
                <p style={introText}>
                    Use your dashboard to generate AI-powered notes, quizzes, flashcards, and revision schedules effortlessly.
                </p>
            </div>

            {/* Feature Cards */}
            <div style={cardsContainer}>
                <FeatureCard
                    icon={<FileText size={36} />}
                    title="Generate Notes"
                    description="Enter a topic to create structured notes with AI."
                    link="/notes"
                />
                <FeatureCard
                    icon={<BookOpen size={36} />}
                    title="Flashcards"
                    description="Convert your notes into interactive AI-generated flashcards."
                    link="/flashcards"
                />
                <FeatureCard
                    icon={<ClipboardList size={36} />}
                    title="Generate Quiz"
                    description="Test your knowledge with AI-generated quizzes from your notes."
                    link="/quiz"
                />
                <FeatureCard
                    icon={<Clock size={36} />}
                    title="Revision"
                    description="Organize and schedule your learning with AI-assisted revision."
                    link="/revision"
                />
            </div>
        </div>
    );
}

// Feature Card
function FeatureCard({ icon, title, description, link }) {
    return (
        <div style={cardWrapper}>
            <div style={cardStyle}>
                <div style={{ marginBottom: "15px" }}>{icon}</div>
                <h3 style={{ fontWeight: 600, marginBottom: "10px" }}>{title}</h3>
                <p style={{ fontSize: "0.95rem", opacity: 0.85, marginBottom: "20px" }}>{description}</p>
                <Link to={link} style={cardButton}>Go</Link>
            </div>
        </div>
    );
}

// Styles
const dashboardWrapper = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0",
    margin: "0"
};

const navbarStyle = {
    width: "100%",
    maxWidth: "1200px",
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
    margin: "0 auto",
    
};

const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    transition: "0.3s",
    cursor: "pointer",
    padding: "5px 8px",
};

const logoutButton = {
    padding: "8px 15px",
    borderRadius: "8px",
    background: "#ef4444",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    border: "none",
    transition: "0.3s",
};

const introWrapper = {
    textAlign: "center",
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
};

const introTitle = {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginBottom: "15px"
};

const introText = {
    fontSize: "1.1rem",
    opacity: 0.8,
};

const cardsContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px 0 40px",
    maxWidth: "1200px",
    margin: "0 auto",
};

const cardWrapper = {
    flex: "1 1 220px",
    maxWidth: "260px",
};

const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "18px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
};

cardStyle[':hover'] = {
    transform: "translateY(-5px)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
};

const cardButton = {
    padding: "10px 20px",
    borderRadius: "10px",
    background: "#4f46e5",
    color: "white",
    fontWeight: 600,
    textDecoration: "none",
    transition: "0.3s",
    cursor: "pointer",
    alignSelf: "center",
};

