import { useState } from "react";
import API from "../services/api";
import Layout from "../Components/Layout"

export default function Flashcards() {
    const [subject, setSubject] = useState("");
    const [flashcards, setFlashcards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [testMode, setTestMode] = useState(false); // new: test yourself mode

    const handleGenerateFlashcards = async () => {
        if (!subject) return;

        try {
            setLoading(true);
            const res = await API.post(`/flashcard/generate?subject=${subject}`);
            const cards = JSON.parse(res.data.content);
            // Add 'flipped' state for each card
            const cardsWithFlip = cards.map(card => ({ ...card, flipped: false }));
            setFlashcards(cardsWithFlip);
        } catch (err) {
            console.error(err);
            alert("Failed to generate flashcards.");
        } finally {
            setLoading(false);
        }
    };

    const toggleFlip = index => {
        setFlashcards(prev =>
            prev.map((card, i) =>
                i === index ? { ...card, flipped: !card.flipped } : card
            )
        );
    };

    return (
        <div style={pageStyle}>
          
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

                {flashcards.length > 0 && (
                    <button
                        style={{ ...buttonStyle, background: "#6b21a8", marginBottom: "20px" }}
                        onClick={() => setTestMode(!testMode)}
                    >
                        {testMode ? "Exit Test Mode" : "Test Yourself"}
                    </button>
                )}

                <div style={cardsContainerStyle}>
                    {flashcards.map((card, index) => (
                        <div
                            key={index}
                            style={{
                                ...cardStyle,
                                transform: card.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            }}
                            onClick={() => toggleFlip(index)}
                        >
                            {!card.flipped && (
                                <div style={cardFrontStyle}>{card.term}</div>
                            )}
                            {(card.flipped || !testMode) && (
                                <div style={cardBackStyle}>{card.definition}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- STYLES ---
const pageStyle = {
   
    width: "100%",
    overflowX: "hidden",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "white",
    fontFamily: "'Segoe UI', sans-serif",
};

const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "100px 20px 60px 20px",
};

const titleStyle = {
    fontSize: "2.2rem",
    fontWeight: 700,
    marginBottom: "15px",
    textAlign: "center",
    textShadow: "0 2px 10px rgba(0,0,0,0.5)",
};

const instructionStyle = {
    opacity: 0.8,
    marginBottom: "25px",
    textAlign: "center",
};

const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    transition: "0.3s ease",
};

const buttonStyle = {
    padding: "14px 35px",
    borderRadius: "12px",
    border: "none",
    background: "#4f46e5",
    color: "white",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    display: "block",
    margin: "0 auto 40px auto",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    transition: "0.3s ease, transform 0.2s ease",
};

const cardsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    perspective: "1000px", // needed for flip effect
};

const cardStyle = {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "18px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    color: "white",
    textAlign: "center",
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
    cursor: "pointer",
};

const cardFrontStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: 600,
};

const cardBackStyle = {
    ...cardFrontStyle,
    transform: "rotateY(180deg)",
};

const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    transition: "0.3s",
    cursor: "pointer",
    padding: "5px 8px",
};