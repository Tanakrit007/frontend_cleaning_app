import { useState, useEffect } from 'react';
import BookingService from '../service/booking.service'; // ✅ แก้จาก cleaning.service เป็น booking.service
import { useUser } from '../context/UserContext';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
    const fetchHistory = async () => {
        try {
            // ✅ ไม่ต้องส่ง userId เข้าไปในฟังก์ชันแล้ว เพราะ Backend จะดึงจาก Token เอง
            const res = await BookingService.getUserBookings();
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    };

    if (user) fetchHistory();
}, [user]);

    if (loading) return <div className="text-center py-20">กำลังโหลดประวัติ...</div>;

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h2 className="text-3xl font-black mb-8 text-slate-800">ประวัติการจองของคุณ</h2>
            {bookings.length === 0 ? (
                <div className="bg-white p-12 rounded-[2rem] text-center shadow-sm border border-slate-100">
                    <p className="text-slate-400">ยังไม่มีประวัติการจองในขณะนี้</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg text-blue-600">{item.service?.name || 'บริการทำความสะอาด'}</h3>
                                <p className="text-slate-500 text-sm">📅 {item.appointmentDate} | 🕒 {item.appointmentTime}</p>
                                <p className="text-slate-400 text-xs mt-1">📍 {item.address}</p>
                            </div>
                            <div className="text-right">
                                <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold uppercase">
                                    {item.status || 'Success'}
                                </span>
                                <p className="font-black text-slate-700 mt-2">฿{item.service?.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookingHistory;