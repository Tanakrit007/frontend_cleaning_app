import api from "./api";

// ✅ ตรวจสอบชื่อตัวแปรให้ตรงกับใน .env (VITE_SERVICE_URL)
// และใส่ค่าสำรอง "/api/services" ไว้หลัง ||
const API_URL = import.meta.env.VITE_SERVICE_URL || "/api/services"; 

const CleaningService = {
  getAllServices: () => {
    // ตรวจสอบใน Console ว่า Path ถูกต้องไหม
    console.log("Requesting services from:", API_URL); 
    return api.get(API_URL);
  },

  getServiceById: (id) => {
    return api.get(`${API_URL}/${id}`);
  },
};

export default CleaningService;