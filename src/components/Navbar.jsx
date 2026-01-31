import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import AuthService from "../service/authentication.service";

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
            <span className="text-white text-xl">✨</span>
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tighter uppercase">CleanPro</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-slate-600 hover:text-blue-600 font-bold transition">หน้าแรก</Link>
          {user ? (
            <div className="flex items-center gap-4 border-l pl-6 border-slate-200">
              <Link to="/history" className="text-slate-600 hover:text-blue-600 font-bold transition">ประวัติจอง</Link>
              {user.role === 'admin' && (
                <div className="flex gap-2">
                  <Link to="/admin" className="text-xs font-black bg-indigo-50 text-indigo-600 px-3 py-2 rounded-xl hover:bg-indigo-100 transition uppercase">Admin Panel</Link>
                  <Link to="/admin/services" className="text-xs font-black bg-indigo-50 text-indigo-600 px-3 py-2 rounded-xl hover:bg-indigo-100 transition uppercase">Services</Link>
                </div>
              )}
              <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-full pl-4">
                <span className="text-sm font-black text-slate-700">{user.username}</span>
                <button onClick={handleLogout} className="bg-white text-red-500 p-2 rounded-full shadow-sm hover:text-red-600 transition">🚪</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-slate-600 hover:text-blue-600 font-bold px-4 transition">เข้าสู่ระบบ</Link>
              <Link to="/register" className="btn-primary !px-6 !py-2.5">สมัครสมาชิก</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;