import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CleaningService from '../service/cleaning.service';

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { service } = location.state || {};
    const [booking, setBooking] = useState({ 
        customerName: '', phone: '', appointmentDate: '', service: service?._id 
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CleaningService.createBooking(booking);
            alert('จองบริการสำเร็จ!');
            navigate('/history');
        } catch (error) { alert('เกิดข้อผิดพลาด กรุณาตรวจสอบข้อมูล'); }
    };

    if (!service) return <div className="text-center py-20 font-black">ไม่พบข้อมูลบริการ</div>;

    return (
        <div className="container mx-auto px-4 py-16 max-w-xl">
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
                <div className="text-center mb-10">
                    <span className="text-3xl">🗓️</span>
                    <h2 className="text-3xl font-black text-slate-800 mt-4">ยืนยันการจอง</h2>
                    <p className="text-blue-600 font-bold mt-2 underline decoration-2">{service.name}</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">ชื่อผู้รับบริการ</label>
                        <input type="text" className="input-field" placeholder="ระบุชื่อ-นามสกุล" required
                            onChange={(e) => setBooking({...booking, customerName: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">เบอร์โทรศัพท์</label>
                        <input type="tel" className="input-field" placeholder="08x-xxx-xxxx" required
                            onChange={(e) => setBooking({...booking, phone: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">วันและเวลาที่สะดวก</label>
                        <input type="datetime-local" className="input-field" required
                            onChange={(e) => setBooking({...booking, appointmentDate: e.target.value})} />
                    </div>
                    
                    <button type="submit" className="w-full btn-primary py-5 text-lg mt-6 shadow-blue-200">
                        ยืนยันการนัดหมาย (฿{service.price})
                    </button>
                </form>
            </div>
        </div>
    );
};
export default BookingPage;