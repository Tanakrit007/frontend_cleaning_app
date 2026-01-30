import { useState, useEffect } from "react";
import CleaningService from "../service/cleaning.service";
import { useUser } from "../context/UserContext";

const AdminDashboard = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await CleaningService.getAllBookings(); 
                setAllBookings(res.data);
            } catch (err) {
                console.error("Fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            const res = await CleaningService.updateBookingStatus(bookingId, newStatus);
            setAllBookings(allBookings.map(b => b._id === bookingId ? res.data : b));
            alert("อัปเดตสถานะสำเร็จ!");
        } catch (err) {
            console.error("Update error", err);
            alert("เกิดข้อผิดพลาดในการอัปเดต");
        }
    };

    if (loading) return <div className="text-center mt-10">กำลังโหลด...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">แดชบอร์ด Admin - รายการจองบริการทั้งหมด</h1>
            {allBookings.length === 0 ? (
                <p className="text-gray-500">ยังไม่มีรายการจอง</p>
            ) : (
                <div className="grid gap-4">
                    {allBookings.map(book => (
                        <div key={book._id} className="p-4 bg-white shadow rounded-lg border-l-4 border-blue-500 flex justify-between items-center">
                            <div className="flex-1">
                                <p className="font-bold text-lg">{book.service?.name}</p>
                                <p className="text-sm text-gray-600">ลูกค้า: {book.customerName} | โทร: {book.phone}</p>
                                <p className="text-xs text-gray-400 mt-1">นัดหมาย: {new Date(book.appointmentDate).toLocaleString('th-TH')}</p>
                            </div>
                            <div className="text-right flex gap-2 items-center">
                                <select 
                                    value={book.status}
                                    onChange={(e) => updateBookingStatus(book._id, e.target.value)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        book.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                        book.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                        book.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                        'bg-red-100 text-red-700'
                                    }`}
                                >
                                    <option value="pending">รอดำเนินการ</option>
                                    <option value="confirmed">ยืนยันแล้ว</option>
                                    <option value="completed">เสร็จแล้ว</option>
                                    <option value="cancelled">ยกเลิก</option>
                                </select>
                                <p className="text-lg font-bold text-gray-800">{book.service?.price} บาท</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default AdminDashboard;