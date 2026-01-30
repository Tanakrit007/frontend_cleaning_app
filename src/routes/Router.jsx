import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import BookingPage from "../pages/BookingPage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminService from "../pages/AdminService";
import BookingHistory from "../pages/BookingHistory";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useUser();
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
    return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/booking",
    element: <ProtectedRoute><BookingPage /></ProtectedRoute>
  },
  {
    path: "/history",
    element: <ProtectedRoute><BookingHistory /></ProtectedRoute>
  },
  {
    path: "/admin",
    element: <ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>
  },
  {
    path: "/admin/services",
    element: <ProtectedRoute adminOnly={true}><AdminService /></ProtectedRoute>
  }
]);

export default router;  