// 1. เปลี่ยนการ import จาก api เป็น AuthService
import AuthService from "../service/authentication.service"; 
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      return alert("รหัสผ่านไม่ตรงกัน");
    }

    setLoading(true);
    try {
      // ✅ 2. เปลี่ยนมาเรียกใช้ AuthService.register แทน
      // วิธีนี้จะใช้ Path "/api/users/register" ตามที่ตั้งไว้ใน .env อัตโนมัติ
      await AuthService.register(user.username, user.password);
      
      alert("สมัครสมาชิกสำเร็จ!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl text-3xl mb-4 shadow-lg shadow-blue-200">
            ✨
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter">สร้างบัญชีใหม่</h2>
          <p className="text-slate-400 font-medium mt-2">เริ่มต้นใช้บริการทำความสะอาดมืออาชีพ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">ชื่อผู้ใช้งาน</label>
            <input
              type="text"
              className="input-field"
              placeholder="เลือกชื่อผู้ใช้งาน"
              required
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">รหัสผ่าน</label>
            <input
              type="password"
              className="input-field"
              placeholder="ตั้งรหัสผ่านของคุณ"
              required
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">ยืนยันรหัสผ่านอีกครั้ง</label>
            <input
              type="password"
              className="input-field"
              placeholder="ยืนยันรหัสผ่าน"
              required
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 mt-4 shadow-blue-200 text-lg"
          >
            {loading ? "กำลังบันทึกข้อมูล..." : "สร้างบัญชีผู้ใช้"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-slate-400 font-medium">
            มีบัญชีอยู่แล้ว?{" "}
            <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-4">
              เข้าสู่ระบบที่นี่
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;