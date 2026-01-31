// src/pages/AllServices.jsx
import { useState, useEffect } from "react";
import CleaningService from "../service/cleaning.service";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await CleaningService.getAllServices();
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
          บริการทำความสะอาดทั้งหมด
        </h1>
        <p className="text-slate-500 font-medium">เลือกบริการที่เหมาะกับบ้านและความต้องการของคุณ</p>
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
    </div>
  );
};

export default AllServices;