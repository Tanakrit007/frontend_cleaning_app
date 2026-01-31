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
        setServices(res.data);
      } catch (err) { console.error(err); }
    };
    fetchServices();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - จัดวางกึ่งกลางและใช้ระยะห่างที่เหมาะสม */}
      <section className="bg-white py-16 md:py-24 border-b border-slate-50">
        <div className="container-custom text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black text-blue-600 bg-blue-50 rounded-full uppercase tracking-widest">
            Professional Cleaning
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            จองความสะอาด <br/> <span className="text-blue-600">ให้บ้านที่คุณรัก</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-medium mb-10 leading-relaxed">
            เปลี่ยนเรื่องงานบ้านที่น่าเบื่อ ให้เป็นหน้าที่ของมืออาชีพ จองง่าย รวดเร็ว และปลอดภัย
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">เลือกบริการเลย</button>
            <button className="px-8 py-3 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition">
              รีวิวลูกค้า
            </button>
          </div>
        </div>
      </section>

      {/* Services Section - จัดเรียงเป็น Grid 3 คอลัมน์ที่สวยงาม */}
      <section className="container-custom py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black text-slate-800">บริการยอดนิยม</h2>
          <div className="h-px bg-slate-200 flex-grow ml-8 hidden md:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map(s => (
            <ServiceCard 
              key={s._id} 
              service={s} 
              onBook={(s) => navigate("/booking", { state: { service: s } })} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;