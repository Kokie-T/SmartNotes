import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
            }}
        >
            <Navbar />

            <div style={{ flex: 1 }}>
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}