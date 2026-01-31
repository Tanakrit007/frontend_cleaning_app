import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router"; // ✅ ตรวจสอบ Path และชื่อไฟล์
import { UserContextProvider } from "./context/UserContext";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ✅ ต้องครอบด้วย Provider ทั้งหมดที่จำเป็น */}
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);