import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CleaningService from '../service/cleaning.service';

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { service } = location.state || {}; // รับข้อมูลบริการที่ส่งมาจากหน้า Home

    const [booking, setBooking] = useState({
        customerName: '',
        phone: '',
        appointmentDate: '',
        service: service?._id || ''
    });

    const handleChange = (e) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CleaningService.createBooking(booking);
            alert('การจองสำเร็จ! เราจะติดต่อกลับโดยเร็วที่สุด');
            navigate('/'); // จองเสร็จแล้วกลับไปหน้าแรก
        } catch (error) {
            console.error("Booking error", error);
            alert('เกิดข้อผิดพลาดในการจอง กรุณาลองใหม่');
        }
    };

    if (!service) return <div className="text-center mt-10">กรุณาเลือกบริการจากหน้าแรกก่อน</div>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ยืนยันการจอง: {service.name}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ชื่อผู้จอง</label>
                    <input 
                        type="text" name="customerName" required
                        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                    <input 
                        type="tel" name="phone" required
                        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">วันที่และเวลาที่นัดหมาย</label>
                    <input 
                        type="datetime-local" name="appointmentDate" required
                        className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={handleChange}
                    />
                </div>
                
                <div className="pt-4">
                    <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition shadow-md">
                        ยืนยันการจอง (ราคา {service.price} บาท)
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingPage;