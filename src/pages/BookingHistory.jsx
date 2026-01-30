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
        if (!user) {
          setLoading(false);
          return;
        }
        const res = await CleaningService.getUserBookings(user.username);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user]);

  if (loading) return <div className="text-center mt-10">กำลังโหลดประวัติการจอง...</div>;

  if (!user) return <div className="text-center mt-10 text-red-500">กรุณาเข้าสู่ระบบเพื่อดูประวัติการจอง</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">ประวัติการจองของคุณ</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500">คุณยังไม่มีประวัติการจอง</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-blue-600">
                  {item.service?.name || "ไม่ระบุบริการ"}
                </h3>
                <p className="text-gray-600 text-sm">
                  นัดหมายวันที่: {new Date(item.appointmentDate).toLocaleString('th-TH')}
                </p>
                <p className="text-sm font-medium">สถานะ: 
                  <span className={`ml-2 ${item.status === 'pending' ? 'text-orange-500' : item.status === 'confirmed' ? 'text-green-500' : item.status === 'completed' ? 'text-blue-500' : 'text-red-500'}`}>
                    {item.status === 'pending' ? 'รอดำเนินการ' : item.status === 'confirmed' ? 'ยืนยันแล้ว' : item.status === 'completed' ? 'เสร็จแล้ว' : 'ยกเลิก'}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{item.service?.price} บาท</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;