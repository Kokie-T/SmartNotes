import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Notes from "./pages/Notes";
import Revision from "./pages/Revision";
import Flashcards from "./pages/Flashcards";
import GenerateQuiz from "./pages/GenerateQuiz";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/revision" element={<Revision />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/generatequiz" element={<GenerateQuiz />} />
            </Routes>
        </BrowserRouter>
    );
}