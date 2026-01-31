// ไฟล์: src/service/token.service.js

// ✅ 1. เพิ่ม export หน้าฟังก์ชัน เพื่อให้ api.js เรียกใช้ได้โดยตรง
export const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
    localStorage.removeItem("user");
};

export const getToken = () => {
    const user = getUser();
    return user?.token || null;
};

// ✅ 2. ยังคง export default ไว้ เพื่อให้ authentication.service.js และ UserContext.jsx ทำงานได้ต่อ
const TokenService = { setUser, getUser, removeUser, getToken };
export default TokenService;