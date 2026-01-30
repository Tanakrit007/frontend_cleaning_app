import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AuthService from "../service/authentication.service";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    alert("ออกจากระบบสำเร็จ!");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wider">🧹 CLEANING PRO</Link>
        <div className="space-x-4 text-sm md:text-base flex items-center">
          <Link to="/" className="hover:text-blue-200 transition">หน้าแรก</Link>
          
          {user ? (
            <>
              <Link to="/history" className="hover:text-blue-200 transition">ประวัติการจอง</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin" className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-800 transition">รายการจอง</Link>
                  <Link to="/admin/services" className="bg-purple-700 px-3 py-1 rounded hover:bg-purple-800 transition">บริการ</Link>
                </>
              )}
              <span className="text-sm bg-blue-700 px-2 py-1 rounded">👤 {user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition">เข้าสู่ระบบ</Link>
              <Link to="/register" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition">สมัครสมาชิก</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;