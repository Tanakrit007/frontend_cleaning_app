import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/authentication.service";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [userCred, setUserCred] = useState({ username: "", password: "" });
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserCred({ ...userCred, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await AuthService.login(userCred.username, userCred.password);
      setUser(data);
      alert("เข้าสู่ระบบสำเร็จ!");
      navigate("/");
    } catch (error) {
      alert("Login Failed: " + error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">เข้าสู่ระบบ</h2>
        <input
          type="text" name="username" placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange} required
        />
        <input
          type="password" name="password" placeholder="Password"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange} required
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          ยังไม่มีบัญชี? <a href="/register" className="text-blue-500 underline">สมัครเลย</a>
        </p>
      </form>
    </div>
  );
};
export default Login;