import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowRoles }) {
  const { user } = useAuth();

  // If not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If route requires roles and current role not allowed → redirect home
  if (allowRoles && !allowRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
