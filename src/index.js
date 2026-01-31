import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router"; // ✅ ดึงการตั้งค่าเส้นทางมาจากไฟล์ Router.jsx
import { UserContextProvider } from "./context/UserContext";
import './index.css';

// ตรวจสอบว่ามี element ID 'root' ใน index.html ของคุณ
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("ไม่พบ 'root' element ใน index.html กรุณาตรวจสอบไฟล์ HTML ของคุณ");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* ✅ ครอบด้วย UserContextProvider เพื่อให้ทุกหน้าใช้ข้อมูล User ได้ */}
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);