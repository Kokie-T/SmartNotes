import { useState } from "react";
import API from "../services/api";

export default function Dashboard() {
    const [subject, setSubject] = useState("");
    const [notes, setNotes] = useState("");
    const [quiz, setQuiz] = useState("");

    const generateNotes = async () => {
        const res = await API.post(`/notes/generate?subject=${subject}`);
        setNotes(res.data.content);
    };

    const generateQuiz = async () => {
        const res = await API.post(`/quiz/generate?subject=${subject}`);
        setQuiz(res.data.questionsJson);
    };

    return (
        <div>
            <h2>AI Notes Generator</h2>

            <input
                placeholder="Enter subject"
                onChange={(e) => setSubject(e.target.value)}
            />

            <button onClick={generateNotes}>Generate Notes</button>
            <button onClick={generateQuiz}>Generate Quiz</button>

            <div>
                <h3>Notes</h3>
                <p>{notes}</p>
            </div>

            <div>
                <h3>Quiz</h3>
                <pre>{quiz}</pre>
            </div>
        </div>
    );
}