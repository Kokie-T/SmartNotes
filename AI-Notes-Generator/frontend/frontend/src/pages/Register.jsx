import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getPasswordStrength = () => {
        if (password.length > 8 && /[A-Z]/.test(password) && /\d/.test(password)) {
            return { text: "Strong", color: "#4ade80" };
        } else if (password.length >= 6) {
            return { text: "Medium", color: "#facc15" };
        } else if (password.length > 0) {
            return { text: "Weak", color: "#f87171" };
        }
        return null;
    };

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const res = await API.post("/auth/register", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError("Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const strength = getPasswordStrength();

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
                    <h1 style={{ fontWeight: 600, marginBottom: "10px" }}>
                        Smart Notes
                    </h1>
                    <p style={{ opacity: 0.7, fontSize: "0.95rem" }}>
                        Capture thoughts. Build clarity.
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

                {strength && (
                    <div
                        style={{
                            color: strength.color,
                            fontSize: "0.85rem",
                            marginBottom: "10px"
                        }}
                    >
                        Password strength: {strength.text}
                    </div>
                )}

                {/* Confirm Password */}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={inputStyle}
                />

                <button
                    onClick={handleRegister}
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
                    {loading ? "Creating Account..." : "Enter Smart Notes"}
                </button>

                <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <small style={{ opacity: 0.7 }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#818cf8" }}>
                            Login
                        </Link>
                    </small>
                </div>

                <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <small style={{ opacity: 0.5 }}>
                        By creating an account, you agree to our Terms & Privacy Policy.
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