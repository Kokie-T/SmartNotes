import { useState } from "react";
import API from "../services/api";

export default function GenerateQuiz() {
    const [subject, setSubject] = useState("");
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!subject.trim()) return;

        try {
            setLoading(true);
            const res = await API.post(`/quiz/generate?subject=${subject}`);
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
        
            <div style={{ maxWidth: "900px", margin: "80px auto 50px auto", padding: "0 20px" }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "20px" }}>
                    Generate Quiz with AI
                </h2>

                <p style={{ opacity: 0.8, marginBottom: "25px" }}>
                    Enter a subject below. The AI will generate practice quiz questions
                    with multiple-choice answers to test your understanding.
                </p>

                <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "20px" }}>
                    <input
                        placeholder="e.g. Algebra, JavaScript, Human Anatomy"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        style={inputStyle}
                    />
                    <button onClick={handleGenerate} disabled={loading} style={primaryButton}>
                        {loading ? "Generating..." : "Generate Quiz"}
                    </button>
                </div>

                {quiz.length > 0 && (
                    <div style={resultContainer}>
                        <h3 style={{ marginBottom: "20px" }}>Generated Quiz</h3>
                        {quiz.map((q, index) => (
                            <div key={index} style={quizCard}>
                                <p style={{ fontWeight: 600, marginBottom: "10px" }}>
                                    {index + 1}. {q.question}
                                </p>
                                {q.options?.map((opt, i) => (
                                    <p key={i} style={{ opacity: 0.85, marginLeft: "10px" }}>
                                        • {opt}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
       
    );
}

/* ------------------ STYLES ------------------ */
const inputStyle = {
    flex: 1,
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
    fontSize: "1rem",
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
    whiteSpace: "nowrap",
};

const resultContainer = {
    marginTop: "20px",
};

const quizCard = {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
}