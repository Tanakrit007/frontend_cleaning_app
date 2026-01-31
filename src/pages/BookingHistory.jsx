import { useState, useEffect } from "react";
import CleaningService from "../service/cleaning.service";
import { useUser } from "../context/UserContext";

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await CleaningService.getUserBookings(user.id);
                setBookings(res.data);
            } catch (err) { console.error(err); }
        };
        if (user) fetchHistory();
    }, [user]);

    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h2 className="text-4xl font-black text-slate-800 mb-10 tracking-tight">รายการจองของฉัน</h2>
            <div className="grid gap-6">
                {bookings.length > 0 ? bookings.map(b => (
                    <div key={b._id} className="card-premium flex flex-col md:flex-row justify-between items-center gap-6 border-l-8 border-l-blue-600">
                        <div className="flex gap-5 items-center w-full">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🧹</div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">{b.service?.name}</h3>
                                <p className="text-slate-400 text-sm font-medium">📍 {new Date(b.appointmentDate).toLocaleString('th-TH')}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0">
                            <span className="text-2xl font-black text-blue-600">฿{b.service?.price}</span>
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${b.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                {b.status === 'pending' ? 'รอดำเนินการ' : 'เสร็จสิ้น'}
                            </span>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold">ยังไม่มีประวัติการจองบริการ</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default BookingHistory;