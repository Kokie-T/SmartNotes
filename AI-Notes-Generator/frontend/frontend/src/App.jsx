import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/Flashcards";
import GenerateQuiz from "./pages/GenerateQuiz";
import Revision from "./pages/Revision";
import Notes from "./pages/Notes";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* All pages that need Navbar + Footer go inside Layout */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/flashcards" element={<Flashcards />} />
                    <Route path="/generatequiz" element={<GenerateQuiz />} />
                    <Route path="/revision" element={<Revision />} />
                </Route>

                {/* Pages WITHOUT layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}