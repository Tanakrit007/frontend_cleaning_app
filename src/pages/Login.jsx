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
      const data = await AuthService.login(userCred.username, userCred.password);
      setUser(data);
      navigate("/");
    } catch (err) {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
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
              className="input-field"
              placeholder="Username"
              required
              onChange={(e) => setUserCred({ ...userCred, username: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">รหัสผ่าน</label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              required
              onChange={(e) => setUserCred({ ...userCred, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 mt-4 shadow-blue-200 text-lg"
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