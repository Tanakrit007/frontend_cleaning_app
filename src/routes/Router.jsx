// src/routes/Router.jsx
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import AllServices from "../pages/AllServices";
import BookingPage from "../pages/BookingPage";
import BookingHistory from "../pages/BookingHistory";
import AdminDashboard from "../pages/AdminDashboard";
import AdminService from "../pages/AdminService";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute"; // แยกตัวเช็คสิทธิ์ออกไปด้วยจะดีมาก

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <AllServices /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/booking", element: <ProtectedRoute><BookingPage /></ProtectedRoute> },
      { path: "/history", element: <ProtectedRoute><BookingHistory /></ProtectedRoute> },
      { path: "/admin", element: <ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute> },
      { path: "/admin/services", element: <ProtectedRoute adminOnly={true}><AdminService /></ProtectedRoute> }
    ]
  }
]);

export default router;