import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch {
            setError("Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
                margin: 0,
                padding: 0
            }}
        >
            <div
                style={{
                    width: "420px",
                    padding: "40px",
                    borderRadius: "18px",
                    background: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    color: "white"
                }}
            >
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                    <h1 style={{ fontWeight: 600, marginBottom: "10px" }}>Smart Notes</h1>
                    <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>
                        Continue building clarity.
                    </p>
                </div>

                {error && (
                    <div
                        style={{
                            backgroundColor: "rgba(248,113,113,0.15)",
                            padding: "8px",
                            borderRadius: "8px",
                            marginBottom: "15px",
                            fontSize: "0.9rem"
                        }}
                    >
                        {error}
                    </div>
                )}

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />

                {/* Password */}
                <div style={{ position: "relative" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: "absolute",
                            right: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            opacity: 0.6
                        }}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "none",
                        marginTop: "10px",
                        backgroundColor: "#4f46e5",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "0.3s ease"
                    }}
                >
                    {loading ? "Logging in..." : "Enter Smart Notes"}
                </button>

                <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <small style={{ opacity: 0.7 }}>
                        New to Smart Notes?{" "}
                        <Link to="/register" style={{ color: "#818cf8" }}>
                            Create account
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none"
};