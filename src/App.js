import { RouterProvider, Outlet } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserContextProvider } from "./context/UserContext";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminService from "./pages/AdminService";
import BookingHistory from "./pages/BookingHistory";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useUser();
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
    return children;
};

// Layout component that includes Navbar
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
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
    ]
  }
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;