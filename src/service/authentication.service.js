import api from "./api";
import TokenService from "./token.service";

const login = async (username, password) => {
    const response = await api.post("/users/login", { username, password });
    if (response.data.token) {
        TokenService.setUser({ token: response.data.token, username, userId: response.data.userId });
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