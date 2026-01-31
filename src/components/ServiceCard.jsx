import { useState } from 'react';

const ServiceCard = ({ service, onBook }) => (
  <div className="card-premium group flex flex-col h-full">
    <div className="relative overflow-hidden rounded-[2rem] h-56 mb-6">
      <img 
        src={service.imageUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800"} 
        alt={service.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
      />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-blue-600 shadow-sm">
        แนะนำโดยผู้ใช้
      </div>
    </div>
    
    <div className="flex flex-col flex-grow px-2">
      <h3 className="text-xl font-black text-slate-800 mb-2">{service.name}</h3>
      <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium">
        {service.description}
      </p>
      
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
        <div>
          <span className="text-[10px] text-slate-400 block font-black uppercase tracking-wider">ราคาเริ่มต้น</span>
          <span className="text-2xl font-black text-blue-600">฿{service.price}</span>
        </div>
        <button 
          onClick={() => onBook(service)}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors shadow-lg"
        >
          จองเลย
        </button>
      </div>
    </div>
  </div>
);
export default ServiceCard;