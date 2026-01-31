import axios from "axios";
import Cookies from "js-cookie"; // ✅ นำเข้าตัวจัดการ Cookie

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.interceptors.request.use(
  (config) => {
    // ✅ ดึงข้อมูล user จาก Cookie (ชื่อต้องตรงกับในรูปคือ "user")
    const userData = Cookies.get("user");
    
    if (userData) {
      // ข้อมูลใน Cookie มักจะถูก Encode ไว้ ต้อง Parse เป็น JSON ก่อน
      const parsedUser = JSON.parse(decodeURIComponent(userData));
      
      // ✅ ดึง token ออกมา (จากรูปของคุณ Backend ส่งมาในชื่อ "token")
      const token = parsedUser.token;

      if (token) {
        config.headers["x-access-token"] = token;
        console.log("แนบ Token จาก Cookie สำเร็จ!");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;