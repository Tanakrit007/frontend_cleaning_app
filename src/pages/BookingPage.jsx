import { useLocation, useNavigate } from 'react-router-dom';

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // ✅ ดึงข้อมูลบริการที่ส่งมาจากหน้า Home ผ่าน state
    const { service } = location.state || {};

    // ถ้าไม่มีข้อมูลบริการ (เช่น เข้าหน้านี้โดยตรง) ให้ส่งกลับไปหน้าแรก
    if (!service) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">ไม่พบข้อมูลบริการ</h2>
                <button onClick={() => navigate("/")} className="btn-primary">กลับหน้าแรก</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-xl">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100">
                <div className="text-center mb-10">
                    <span className="text-4xl">🧹</span>
                    <h2 className="text-3xl font-black text-slate-800 mt-4 tracking-tight">ยืนยันการจอง</h2>
                    <div className="bg-blue-50 text-blue-600 py-2 px-4 rounded-xl inline-block mt-4 font-bold">
                        {service.name}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <span className="text-slate-500 font-bold">ราคาค่าบริการ</span>
                        <span className="text-2xl font-black text-slate-800">฿{service.price}</span>
                    </div>

                    {/* ส่วนฟอร์มข้อมูลผู้จอง (สามารถใส่ logic จองต่อได้ที่นี่) */}
                    <div className="pt-6 border-t border-slate-100">
                        <p className="text-center text-slate-400 text-sm">
                            กรุณากรอกข้อมูลส่วนตัวในขั้นตอนถัดไปเพื่อเสร็จสิ้นการนัดหมาย
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;