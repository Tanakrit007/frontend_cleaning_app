import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CleaningService from "../service/cleaning.service";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await CleaningService.getServiceById(id); // ตรวจสอบว่าใน service มีฟังก์ชันนี้
        setService(res.data);
      } catch (err) {
        console.error("Error fetching service detail:", err);
      }
    };
    fetchService();
  }, [id]);

  if (!service) return <div className="text-center py-20 font-bold">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-[2.5rem] p-8 shadow-2xl">
        {/* ส่วนรูปภาพ */}
        <div className="lg:w-1/2">
          <img 
            src={service.imageUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6958"} 
            alt={service.name}
            className="w-full h-[400px] object-cover rounded-[2rem] shadow-lg"
          />
        </div>

        {/* ส่วนรายละเอียด */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <span className="text-blue-600 font-black uppercase tracking-widest mb-4">Service Detail</span>
          <h1 className="text-4xl font-black text-slate-900 mb-4">{service.name}</h1>
          <p className="text-slate-500 text-lg leading-relaxed mb-8">
            {service.description}
          </p>
          
          <div className="bg-slate-50 p-6 rounded-2xl mb-8 flex justify-between items-center">
            <div>
              <p className="text-slate-400 font-bold text-sm uppercase">ราคาเริ่มต้น</p>
              <p className="text-4xl font-black text-blue-600">฿{service.price}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 font-bold text-sm uppercase">ระยะเวลา</p>
              <p className="text-lg font-bold text-slate-700">ประมาณ 2-4 ชม.</p>
            </div>
          </div>

          <button 
            onClick={() => navigate("/booking", { state: { service } })}
            className="w-full py-5 bg-blue-600 text-white font-black text-xl rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
          >
            จองบริการนี้ทันที
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;