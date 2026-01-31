import { Cookies } from "react-cookie";
const cookies = new Cookies();

const getUser = () => {
  return cookies.get("user"); // ดึงข้อมูล user จาก cookie
};

const getAccessToken = () => {
  const user = getUser();
  return user?.accessToken || user?.token;
};

const setUser = (user) => {
  // บันทึกลง cookie (ตั้งค่า expires ได้)
  cookies.set("user", JSON.stringify(user), { path: "/", maxAge: 86400 }); 
};

const removeUser = () => {
  cookies.remove("user", { path: "/" });
};

export default { getUser, getAccessToken, setUser, removeUser };