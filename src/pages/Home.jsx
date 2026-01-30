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
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

  const handleBook = (service) => {
    // นำทางไปยังหน้าจองพร้อมส่งข้อมูลบริการไปด้วย
    navigate("/booking", { state: { service } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">บริการทำความสะอาดของเรา</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service._id} service={service} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
};
export default Home;