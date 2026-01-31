// src/pages/Home.jsx
import { useState, useEffect } from "react";
import CleaningService from "../service/cleaning.service";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await CleaningService.getAllServices();
        // ✅ แสดงแค่ 3 บริการแรกในหน้าแรก
        setServices(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 border-b border-slate-50 text-center">
        <div className="container mx-auto px-4">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black text-blue-600 bg-blue-50 rounded-full uppercase">
            Premium Cleaning
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
            จองความสะอาด <br/> <span className="text-blue-600">ให้บ้านที่คุณรัก</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl mb-10">
            ทีมงานมืออาชีพพร้อมดูแลบ้านคุณ จองง่าย รวดเร็ว และปลอดภัย
          </p>
          <div className="flex justify-center">
  <button 
    onClick={() => navigate("/services")} // ✅ ลิงก์ไปที่หน้าบริการทั้งหมด
    className="btn-primary px-10 py-4 text-lg"
  >
    เลือกบริการเลย
  </button>
</div>
        </div>
      </section>

      {/* Popular Services (Top 3) */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black text-slate-800">บริการยอดนิยม</h2>
          <button onClick={() => navigate("/services")} className="text-blue-600 font-bold hover:underline">
            ดูทั้งหมด →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map(s => (
            <ServiceCard 
              key={s._id} 
              service={s} 
              onBook={() => navigate("/booking", { state: { service: s } })} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;