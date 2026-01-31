import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../service/authentication.service";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [userCred, setUserCred] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ✅ แก้ไข: ดึง data ออกมาจาก response ของ axios
      const response = await AuthService.login(userCred.username, userCred.password);
      
      // ✅ ใน authentication.service.js เราสั่ง TokenService.setUser ไว้แล้ว
      // ดังนั้นตรงนี้เราแค่เอาข้อมูลที่ได้จาก Backend (response.data) มาอัปเดต Context
      setUser(response.data); 
      
      alert("เข้าสู่ระบบสำเร็จ!");
      navigate("/"); // ไปที่หน้าแรก
    } catch (err) {
      console.error(err);
      // แสดงข้อความ Error จาก Backend ถ้ามี
      const message = err.response?.data?.message || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl text-3xl mb-4 shadow-inner">
            🔑
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter">ยินดีต้อนรับกลับมา</h2>
          <p className="text-slate-400 font-medium mt-2">เข้าสู่ระบบเพื่อจัดการการจองของคุณ</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">ชื่อผู้ใช้งาน</label>
            <input
              type="text"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium"
              placeholder="Username"
              required
              value={userCred.username}
              onChange={(e) => setUserCred({ ...userCred, username: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">รหัสผ่าน</label>
            <input
              type="password"
              className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 transition-all font-medium"
              placeholder="••••••••"
              required
              value={userCred.password}
              onChange={(e) => setUserCred({ ...userCred, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-200 text-lg"
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-slate-400 font-medium">
            ยังไม่มีบัญชี?{" "}
            <Link to="/register" className="text-blue-600 font-black hover:underline underline-offset-4">
              สมัครสมาชิกฟรี
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;