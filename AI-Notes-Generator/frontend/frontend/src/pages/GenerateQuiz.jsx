import { useState } from "react";
import API from "../services/api";
import Navbar from "../Components/Navbar";

export default function GenerateQuiz() {
    const [subject, setSubject] = useState("");
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!subject.trim()) return;

        try {
            setLoading(true);

            const res = await API.post(`/quiz/generate?subject=${subject}`);

            // Parse JSON safely
            const parsedQuiz = JSON.parse(res.data.questionsJson);
            setQuiz(parsedQuiz);
        } catch (err) {
            console.error(err);
            alert("Failed to generate quiz.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <Navbar />

            <div style={containerStyle}>
                <h2 style={titleStyle}>Generate Quiz with AI</h2>

                <p style={instructionStyle}>
                    Enter a subject below. The AI will generate practice quiz questions
                    with multiple-choice answers to test your understanding.
                </p>

                <input
                    placeholder="e.g. Algebra, JavaScript, Human Anatomy"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={inputStyle}
                />

                <button onClick={handleGenerate} style={buttonStyle}>
                    {loading ? "Generating..." : "Generate Quiz"}
                </button>

                {quiz.length > 0 && (
                    <div style={resultStyle}>
                        <h3 style={{ marginBottom: "20px" }}>Generated Quiz</h3>

                        {quiz.map((q, index) => (
                            <div key={index} style={cardStyle}>
                                <p style={{ fontWeight: 600, marginBottom: "10px" }}>
                                    {index + 1}. {q.question}
                                </p>

                                {q.options?.map((option, i) => (
                                    <p key={i} style={{ opacity: 0.85, marginLeft: "10px" }}>
                                        • {option}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ------------------ STYLES ------------------ */

const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "white",
};

const containerStyle = {
    width: "100%",
    maxWidth: "800px",
    margin: "120px auto 40px auto", // pushes below navbar and centers
    padding: "40px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.06)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
};

const titleStyle = {
    fontSize: "1.8rem",
    marginBottom: "15px",
};

const instructionStyle = {
    opacity: 0.8,
    marginBottom: "20px",
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: "20px",
};

const resultStyle = {
    marginTop: "20px",
};

const cardStyle = {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
};