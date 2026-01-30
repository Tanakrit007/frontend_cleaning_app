import { useState } from 'react';

const ServiceCard = ({ service, onBook }) => {
  const [imageError, setImageError] = useState(false);

  const defaultImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect fill="%23E5E7EB" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" font-size="18" fill="%236B7280" text-anchor="middle" dy=".3em" font-family="Arial"%3EService Image%3C/text%3E%3C/svg%3E';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <img 
        src={service.imageUrl || defaultImage} 
        alt={service.name} 
        className="w-full h-48 object-cover bg-gray-200"
        onError={() => setImageError(true)}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{service.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-blue-600 font-bold text-lg">{service.price} บาท</span>
          <button 
            onClick={() => onBook(service)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition"
          >
            จองบริการ
          </button>
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;