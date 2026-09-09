import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../data/auth.jsx";

export default function RouteProtegee({ children }) {
  const { connecte } = useAuth();
  const location = useLocation();

  if (!connecte) {
    return <Navigate to="/admin/connexion" state={{ from: location.pathname }} replace />;
  }
  return children;
}
