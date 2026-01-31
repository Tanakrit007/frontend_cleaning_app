import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import BookingService from '../service/booking.service';
import { useUser } from '../context/UserContext'; // ✅ นำเข้าเพื่อดึงชื่อผู้ใช้

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUser(); // ✅ ดึงข้อมูล user จาก Context
    const { service } = location.state || {};

    const [bookingData, setBookingData] = useState({
        date: '',
        time: '',
        address: '',
        phone: '',
        note: ''
    });

    if (!service) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4 text-slate-400">กรุณาเลือกบริการก่อนจอง</h2>
                <button onClick={() => navigate("/")} className="bg-blue-600 text-white px-6 py-2 rounded-xl">ดูบริการทั้งหมด</button>
            </div>
        );
    }

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // ✅ ปรับข้อมูลให้ตรงกับที่ Backend (Mongoose Model) ต้องการ
            const dataToSend = {
                service: service._id,           // เปลี่ยนจาก serviceId เป็น service
                appointmentDate: bookingData.date, // เปลี่ยนจาก date เป็น appointmentDate
                appointmentTime: bookingData.time,
                customerName: user?.username || "Guest", // เพิ่มชื่อลูกค้า
                address: bookingData.address,
                phone: bookingData.phone,
                note: bookingData.note
            };
            
            await BookingService.createBooking(dataToSend);

            Swal.fire({
                icon: 'success',
                title: 'จองสำเร็จ!',
                text: 'เราได้รับข้อมูลการจองของคุณแล้ว',
                confirmButtonColor: '#2563eb'
            });
            navigate('/history'); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.response?.data?.message || 'ไม่สามารถบันทึกการจองได้'
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-blue-600 p-8 text-white">
                    <h2 className="text-3xl font-black mb-2">ยืนยันการจอง</h2>
                    <p className="opacity-90">คุณกำลังจอง: <span className="font-bold underline">{service.name}</span></p>
                    <p className="text-2xl font-black mt-2">฿{service.price}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">วันที่ต้องการรับบริการ</label>
                            <input 
                                type="date" 
                                name="date"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">เวลา</label>
                            <input 
                                type="time" 
                                name="time"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">เบอร์โทรศัพท์ติดต่อ</label>
                        <input 
                            type="tel" 
                            name="phone"
                            placeholder="08X-XXX-XXXX"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">ที่อยู่สำหรับการรับบริการ</label>
                        <textarea 
                            name="address"
                            rows="3"
                            placeholder="บ้านเลขที่, ถนน, แขวง/ตำบล..."
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">หมายเหตุเพิ่มเติม (ถ้ามี)</label>
                        <input 
                            type="text" 
                            name="note"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-blue-500"
                            onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                    >
                        ยืนยันและชำระเงิน
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;