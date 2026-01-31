// src/pages/BookingHistory.jsx
import { useState, useEffect } from "react";
import CleaningService from "../service/cleaning.service";
import { useUser } from "../context/UserContext";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // ✅ ต้องมี user และ userId ถึงจะดึงข้อมูลได้
        if (!user || !user.userId) {
          setLoading(false);
          return;
        }
        // ✅ ส่ง user.userId แทน username
        const res = await CleaningService.getUserBookings(user.userId);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
        fetchHistory();
    }
  }, [user]);

  if (loading) return <div className="text-center mt-10">กำลังโหลดประวัติการจอง...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">กรุณาเข้าสู่ระบบเพื่อดูประวัติการจอง</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">ประวัติการจองของคุณ</h2>
      {bookings.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500 text-lg">คุณยังไม่มีประวัติการจอง</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-black text-xl text-blue-600 mb-1">
                  {item.service?.name || "บริการไม่ระบุ"}
                </h3>
                <p className="text-slate-500 text-sm mb-2">
                  📅 นัดหมาย: {new Date(item.appointmentDate).toLocaleString('th-TH')}
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700">สถานะ:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        item.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                        item.status === 'confirmed' ? 'bg-green-100 text-green-600' : 
                        item.status === 'completed' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                    }`}>
                        {item.status === 'pending' ? 'รอดำเนินการ' : 
                         item.status === 'confirmed' ? 'ยืนยันแล้ว' : 
                         item.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
                    </span>
                </div>
              </div>
              <div className="text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
                <p className="font-black text-2xl text-slate-800">฿{item.service?.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;