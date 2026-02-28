import { useState } from "react";
import API from "../services/api";
import Navbar from "../Components/Navbar";

export default function Flashcards() {
    const [subject, setSubject] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerateFlashcards = async () => {
        if (!subject) return;

        try {
            setLoading(true);
            const res = await API.post(`/flashcard/generate?subject=${subject}`);

            // Expecting JSON array from backend
            const cards = JSON.parse(res.data.content);
            setFlashcards(cards);
        } catch (err) {
            console.error(err);
            alert("Failed to generate flashcards.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <Navbar />

            <div style={containerStyle}>
                <h2 style={titleStyle}>Create Flashcards</h2>

                <p style={instructionStyle}>
                    Enter a subject below. The AI will generate key terms and definitions
                    to help you revise effectively.
                </p>

                <input
                    placeholder="e.g. Human Anatomy, React Hooks, World War 2"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={inputStyle}
                />

                <button onClick={handleGenerateFlashcards} style={buttonStyle}>
                    {loading ? "Generating..." : "Generate Flashcards"}
                </button>

                <div style={cardStyle}>
                    {flashcards.map((card, index) => (
                        <div key={index} style={cardStyle}>
                            <h3 style={{ marginBottom: "10px" }}>{card.term}</h3>
                            <p style={{ opacity: 0.85 }}>{card.definition}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "white"
};

const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "100px 20px 40px 20px"
};

const titleStyle = {
    fontSize: "2rem",
    marginBottom: "20px"
};

const instructionStyle = {
    opacity: 0.8,
    marginBottom: "20px"
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.08)",
    color: "white"
};

const buttonStyle = {
    padding: "12px 30px",
    borderRadius: "10px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    cursor: "pointer"
};

const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    padding: "20px",
    borderRadius: "16px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
};