import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/authentication.service";

const Register = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthService.register(user.username, user.password);
      alert("ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ");
      navigate("/login");
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">สมัครสมาชิก</h2>
        <input
          type="text" name="username" placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange} required
          disabled={loading}
        />
        <input
          type="password" name="password" placeholder="Password"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange} required
          disabled={loading}
        />
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "กำลังสมัคร..." : "Register"}
        </button>
        <p className="mt-4 text-center text-sm">
          มีบัญชีแล้ว? <a href="/login" className="text-blue-500 underline">เข้าสู่ระบบ</a>
        </p>
      </form>
    </div>
  );
};
export default Register;