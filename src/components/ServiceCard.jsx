const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="card-premium group">
      {/* ส่วนรูปภาพ */}
      <div className="relative overflow-hidden rounded-[1.5rem] mb-6 aspect-video">
        <img 
          src={service.imageUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6958"} 
          alt={service.name}
          className="object-cover w-full h-full group-hover:scale-110 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl font-black text-blue-600 shadow-sm">
          ฿{service.price}
        </div>
      </div>
      
      <h3 className="text-xl font-black text-slate-800 mb-2">{service.name}</h3>
      <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-medium">
        {service.description || "บริการทำความสะอาดคุณภาพเยี่ยมโดยทีมงานมืออาชีพ"}
      </p>
      
      {/* ✅ ปุ่มจองที่เชื่อมต่อกับฟังก์ชัน onBook */}
      <button 
        onClick={onBook} 
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-300 shadow-lg shadow-blue-100"
      >
        จองบริการนี้
      </button>
    </div>
  );
};

export default ServiceCard;