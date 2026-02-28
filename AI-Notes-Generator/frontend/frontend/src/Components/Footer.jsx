import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer
            style={{
                width: "100%",
                padding: "25px 0",
                marginTop: "auto",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", // matches landing page
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 -5px 15px rgba(0,0,0,0.3)" // subtle depth
            }}
        >
            {/* Links */}
            <div style={{ display: "flex", gap: "25px", marginBottom: "10px" }}>
                <span style={footerLinkStyle}>About</span>
                <span style={footerLinkStyle}>Privacy</span>
                <span style={footerLinkStyle}>Contact</span>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "20px" }}>
                <FaTwitter style={iconStyle} />
                <FaLinkedin style={iconStyle} />
                <FaGithub style={iconStyle} />
            </div>

            {/* Optional copyright */}
            <div style={{ marginTop: "12px", fontSize: "0.85rem", opacity: 0.7 }}>
                © {new Date().getFullYear()} Smart Notes
            </div>
        </footer>
    );
}

const footerLinkStyle = {
    cursor: "pointer",
    padding: "3px 6px",
    borderRadius: "6px",
    background: "rgba(255,255,255,0.05)",
    transition: "0.3s ease, transform 0.2s ease",
    textDecoration: "none",
    color: "white",
    opacity: 0.8,
    fontSize: "1rem",
    // Hover effect
    ":hover": {
        background: "rgba(255,255,255,0.1)",
        opacity: 1,
        transform: "scale(1.05)"
    }
};

const iconStyle = {
    color: "white",
    cursor: "pointer",
    transition: "0.3s ease, transform 0.2s ease",
    fontSize: "1.2rem",
    opacity: 0.8,
    // Hover effect
    ":hover": {
        opacity: 1,
        transform: "scale(1.1)"
    }
};