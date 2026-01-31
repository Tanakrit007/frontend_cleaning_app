import { useState, useEffect } from "react";
import CleaningService from "../service/cleaning.service";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            const res = await CleaningService.getAllBookings();
            setBookings(res.data);
        };
        fetchAll();
    }, []);

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
                        {bookings.map(b => (
                            <tr key={b._id} className="hover:bg-slate-50/30 transition-colors">
                                <td className="px-8 py-6">
                                    <p className="font-black text-slate-800">{b.customerName}</p>
                                    <p className="text-xs text-blue-500 font-bold">{b.service?.name} · {b.phone}</p>
                                </td>
                                <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                                    {new Date(b.appointmentDate).toLocaleString()}
                                </td>
                                <td className="px-8 py-6 font-black text-slate-800">฿{b.service?.price}</td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                        {b.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default AdminDashboard;