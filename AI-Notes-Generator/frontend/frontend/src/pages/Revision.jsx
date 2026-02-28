import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Revision() {
    const [subject, setSubject] = useState("");
    const [revisionContent, setRevisionContent] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerateRevision = async () => {
        if (!subject.trim()) return;

        try {
            setLoading(true);
            const res = await API.post(`/revision/generate?subject=${subject}`);

            // Expecting array of structured content (sections/questions)
            const parsed = JSON.parse(res.data.content);
            setRevisionContent(parsed);
        } catch (err) {
            console.error(err);
            alert("Failed to generate revision content.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <Navbar />

            <div style={containerStyle}>
                <h2 style={titleStyle}>AI Smart Revision</h2>

                <p style={instructionStyle}>
                    Enter a subject or topic below. The AI will generate:
                    <br />
                    • Brief structured revision notes
                    <br />
                    • Key concepts
                    <br />
                    • Practice questions at the end
                </p>

                <input
                    placeholder="e.g. Photosynthesis, React State, French Revolution"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={inputStyle}
                />

                <button onClick={handleGenerateRevision} style={buttonStyle}>
                    {loading ? "Generating..." : "Generate Revision"}
                </button>

                {revisionContent.length > 0 && (
                    <div style={cardsContainer}>
                        {revisionContent.map((item, index) => (
                            <div key={index} style={cardStyle}>
                                <h3 style={{ marginBottom: "10px" }}>{item.title || `Section ${index + 1}`}</h3>
                                <p style={{ lineHeight: 1.6, opacity: 0.85 }}>
                                    {item.content}
                                </p>
                                {item.link && (
                                    <a href={item.link} style={buttonLinkStyle}>
                                        Go to Topic
                                    </a>
                                )}
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
    width: "95%",
    maxWidth: "900px",
    margin: "100px auto 40px auto",
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

const cardsContainer = {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
};

const cardStyle = {
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
};

const buttonLinkStyle = {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "#4f46e5",
    color: "white",
    fontWeight: 600,
    textDecoration: "none",
    cursor: "pointer",
};