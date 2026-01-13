import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // 1️⃣ WAIT until auth check finishes
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // 2️⃣ Only AFTER loading is false
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Auth confirmed
  return <Outlet />;
};

export default ProtectedRoute;
