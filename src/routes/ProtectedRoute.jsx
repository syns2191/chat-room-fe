import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const ProtectedRoute = () => {
  const auth = useAuth();
  const token = auth && auth.token;

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;