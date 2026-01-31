// ไฟล์: src/service/api.js
import axios from 'axios';
import { getToken } from './token.service'; // ✅ เปลี่ยนมาใช้ Named Import (ใส่ปีกกา)

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ตรวจสอบว่า Backend Port ตรงกับที่คุณรัน (เช่น 5000 หรือ 4000)
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = getToken(); // ✅ เรียกฟังก์ชันได้โดยตรง ไม่ต้องผ่าน TokenService
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export default API;