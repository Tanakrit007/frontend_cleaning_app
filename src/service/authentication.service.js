import api from "./api";
import TokenService from "./token.service";

const login = async (username, password) => {
    const response = await api.post("/users/login", { username, password });
    
    if (response.data.token) {
        // ✅ ตอนนี้ response.data.userId จะมีค่าแล้ว
        TokenService.setUser({ 
            token: response.data.token, 
            username: response.data.username, 
            userId: response.data.userId, // ต้องตรงกับที่ Backend ส่งมา
            role: response.data.role 
        });
    }
    return response.data;
};

const register = async (username, password) => {
    const response = await api.post("/users/register", { username, password });
    return response.data;
};

const logout = () => {
    TokenService.removeUser();
};

export default { login, logout, register };