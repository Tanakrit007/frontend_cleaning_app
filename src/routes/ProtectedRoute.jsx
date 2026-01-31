// src/routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useUser();

    // 1. ถ้ายังไม่ได้ Login ให้เด้งไปหน้า Login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. ถ้าหน้านี้สำหรับ Admin เท่านั้น แต่ User ไม่ใช่ Admin ให้เด้งไปหน้าแรก
    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // 3. ถ้าผ่านเงื่อนไขทั้งหมด ให้แสดงหน้าที่ต้องการ (children)
    return children;
};

export default ProtectedRoute; // ✅ สำคัญมาก ต้องมีบรรทัดนี้