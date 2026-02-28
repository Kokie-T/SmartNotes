import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AiOutlineFileText } from "react-icons/ai"; // Icon for notes

export default function NotesPage() {
    const [subject, setSubject] = useState("");
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(false);

    // Dummy user – replace with actual auth context
    const user = { email: "user@example.com", avatar: null };

    const generateNotes = async () => {
        if (!subject) return;
        setLoading(true);
        try {
            const res = await API.post(`/notes/generate?subject=${subject}`);
            setNotes(res.data.content);
        } catch {
            setNotes("Failed to generate notes. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "#0f2027", color: "white", fontFamily: "'Segoe UI', sans-serif" }}>
            <Navbar user={user} />

            <div style={{ maxWidth: "1200px", margin: "80px auto 50px auto", padding: "0 20px" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "20px" }}>
                    <AiOutlineFileText style={{ verticalAlign: "middle", marginRight: "8px" }} />
                    Generate Notes
                </h2>

                <p style={{ opacity: 0.8, marginBottom: "25px" }}>
                    Enter the subject or topic below and click "Generate Notes" to get AI-generated summaries for your study.
                </p>

                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Enter subject..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={generateNotes} disabled={loading} style={primaryButton}>
                        {loading ? "Generating..." : "Generate Notes"}
                    </button>
                </div>

                {notes && (
                    <div style={cardStyle}>
                        <h3 style={{ fontWeight: 600, marginBottom: "10px" }}>Your Notes</h3>
                        <p style={{ whiteSpace: "pre-line" }}>{notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Styles
const inputStyle = {
    flex: 1,
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
    fontSize: "1rem"
};

const primaryButton = {
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.3s",
    whiteSpace: "nowrap"
};

const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "18px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
    color: "white",
    marginTop: "20px"
};