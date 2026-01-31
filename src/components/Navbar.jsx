import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Cookies from 'js-cookie';

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State สำหรับเปิด/ปิดเมนูบนมือถือ

  const handleLogout = () => {
    Cookies.remove('user');
    setUser(null);
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-[1000] border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* 1. Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white text-xl font-black">C</span>
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">CLEANPRO</span>
        </Link>

        {/* 2. Desktop Menu (แสดงบนจอใหญ่เท่านั้น) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-600 font-bold hover:text-blue-600 transition">หน้าแรก</Link>
          {user ? (
            <>
              <Link to="/history" className="text-slate-600 font-bold hover:text-blue-600 transition">ประวัติจอง</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin" className="text-blue-600 font-black">ADMIN PANEL</Link>
                  <Link to="/admin/services" className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold">SERVICES</Link>
                </>
              )}
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <span className="text-sm font-black text-slate-400 uppercase">{user.username}</span>
                <button onClick={handleLogout} className="bg-red-50 text-red-500 px-4 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition">ออกจากระบบ</button>
              </div>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 transition shadow-lg shadow-blue-200">เข้าสู่ระบบ</Link>
          )}
        </div>

        {/* 3. Mobile Menu Button (Hamburger - แสดงเฉพาะบนมือถือ) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="p-2 text-slate-600 focus:outline-none">
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* 4. Mobile Menu Panel (จะ Slide ลงมาเมื่อกดปุ่ม Hamburger) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-xl animate-fade-in-down">
          <div className="flex flex-col p-6 gap-4">
            <Link to="/" onClick={toggleMenu} className="text-lg font-bold text-slate-700">หน้าแรก</Link>
            {user ? (
              <>
                <Link to="/history" onClick={toggleMenu} className="text-lg font-bold text-slate-700">ประวัติการจอง</Link>
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin" onClick={toggleMenu} className="text-lg font-bold text-blue-600">Admin Dashboard</Link>
                    <Link to="/admin/services" onClick={toggleMenu} className="text-lg font-bold text-blue-600">จัดการบริการ</Link>
                  </>
                )}
                <div className="h-[1px] bg-slate-100 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-slate-400">{user.username}</span>
                  <button onClick={handleLogout} className="text-red-500 font-bold">ออกจากระบบ</button>
                </div>
              </>
            ) : (
              <Link to="/login" onClick={toggleMenu} className="bg-blue-600 text-white text-center py-4 rounded-2xl font-black">เข้าสู่ระบบ</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;