import { Navigate, Outlet } from "react-router-dom";
import tokenService from "../services/tokenService";

export default function ProtectedRoute() {
  const token = tokenService.getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}