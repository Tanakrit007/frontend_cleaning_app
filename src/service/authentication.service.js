import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_URL || "/api/users";

const login = async (username, password) => {
  const response = await api.post(`${API_URL}/login`, { username, password });
  
  // ✅ จุดสำคัญ: ถ้า Login ผ่าน ต้องบันทึกข้อมูลลงเครื่องทันที
  if (response.data && (response.data.accessToken || response.data.token)) {
    TokenService.setUser(response.data); 
    console.log("บันทึกข้อมูลผู้ใช้สำเร็จ:", response.data);
  }
  return response;
};

const register = async (username, password) => {
  return await api.post(`${API_URL}/register`, { username, password });
};

const logout = () => {
  TokenService.removeUser();
};

const AuthService = { register, login, logout };
export default AuthService;