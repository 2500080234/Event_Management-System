import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Only lets in a logged-in user of the given role ("user" | "admin").
export default function ProtectedRoute({ role, redirectTo, children }) {
  const { session } = useAuth();
  if (!session || session.type !== role) return <Navigate to={redirectTo} replace />;
  return children;
}
