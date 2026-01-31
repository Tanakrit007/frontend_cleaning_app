import { useState, useEffect } from "react";
// ✅ เปลี่ยนการ Import จาก CleaningService เป็น BookingService
import BookingService from "../service/booking.service"; 
import Swal from 'sweetalert2';

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);
                // ✅ เรียกใช้ฟังก์ชันจาก BookingService
                const res = await BookingService.getAllBookings();
                setBookings(res.data);
            } catch (err) {
                console.error("Error fetching all bookings:", err);
                Swal.fire({
                    icon: 'error',
                    title: 'โหลดข้อมูลไม่สำเร็จ',
                    text: err.response?.data?.message || 'ไม่สามารถดึงข้อมูลการจองได้'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
                <div>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Dashboard</h2>
                    <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-[0.2em]">Management Overview</p>
                </div>
                <div className="bg-white px-8 py-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <span className="text-slate-400 font-bold">ยอดจองทั้งหมด</span>
                    <span className="text-3xl font-black text-blue-600">{bookings.length}</span>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 text-xs font-black uppercase tracking-widest">
                                <th className="px-8 py-6">ลูกค้า / บริการ</th>
                                <th className="px-8 py-6">วันนัดหมาย</th>
                                <th className="px-8 py-6">ราคา</th>
                                <th className="px-8 py-6">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-8 py-10 text-center text-slate-400 font-medium">
                                        ยังไม่มีข้อมูลการจองในระบบ
                                    </td>
                                </tr>
                            ) : (
                                bookings.map(b => (
                                    <tr key={b._id} className="hover:bg-slate-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <p className="font-black text-slate-800">{b.customerName}</p>
                                            <p className="text-xs text-blue-500 font-bold">{b.service?.name || 'ไม่ระบุบริการ'} · {b.phone}</p>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                                            {/* ✅ ตรวจสอบวันที่เพื่อป้องกัน Error กรณีวันที่ผิดรูปแบบ */}
                                            {b.appointmentDate ? new Date(b.appointmentDate).toLocaleDateString('th-TH') : 'ไม่ระบุวันที่'} {b.appointmentTime}
                                        </td>
                                        <td className="px-8 py-6 font-black text-slate-800">฿{b.service?.price || 0}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                b.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                                            }`}>
                                                {b.status || 'pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;