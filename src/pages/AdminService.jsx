import { useState, useEffect } from "react";
import api from "../service/api";

const AdminService = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ เรียกฟังก์ชันดึงข้อมูลเมื่อโหลดหน้าจอ
  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      // ✅ แก้ไข: เพิ่ม /api นำหน้า Path เพื่อให้ตรงกับ Backend Router
      const res = await api.get("/api/services"); 
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // ✅ แก้ไข: เพิ่ม /api สำหรับการ Update
        await api.put(`/api/services/${editingId}`, formData);
        alert("อัปเดตบริการสำเร็จ!");
        setEditingId(null);
      } else {
        // ✅ แก้ไข: เพิ่ม /api สำหรับการ Create
        await api.post("/api/services", formData);
        alert("เพิ่มบริการสำเร็จ!");
      }
      setFormData({ name: "", description: "", price: "", imageUrl: "" });
      fetchServices(); // โหลดข้อมูลใหม่หลังบันทึก
    } catch (err) {
      alert("เกิดข้อผิดพลาด: " + err.message);
    }
  };

  const handleEdit = (service) => {
    setFormData(service);
    setEditingId(service._id);
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "", price: "", imageUrl: "" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ที่จะลบบริการนี้?")) {
      try {
        // ✅ แก้ไข: เพิ่ม /api สำหรับการ Delete
        await api.delete(`/api/services/${id}`);
        alert("ลบบริการสำเร็จ!");
        fetchServices();
      } catch (err) {
        alert("เกิดข้อผิดพลาด: " + err.message);
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-gray-600 font-bold">กำลังโหลดข้อมูลบริการ...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">⚙️ จัดการบริการ</h1>
          <p className="text-gray-600">จัดการรายการบริการทำความสะอาดทั้งหมดในระบบ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24 border border-blue-50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingId ? "✏️ แก้ไขบริการ" : "➕ เพิ่มบริการใหม่"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📝 ชื่อบริการ</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border-2 border-gray-100 rounded-lg outline-none focus:border-blue-500 transition" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📄 รายละเอียด</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full p-3 border-2 border-gray-100 rounded-lg outline-none focus:border-blue-500 transition" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">💰 ราคา (บาท)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-3 border-2 border-gray-100 rounded-lg outline-none focus:border-blue-500 transition" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🖼️ URL รูปภาพ</label>
                  <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="w-full p-3 border-2 border-gray-100 rounded-lg outline-none focus:border-blue-500 transition" />
                </div>
                <div className="flex gap-2 pt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
                    {editingId ? "บันทึก" : "เพิ่มบริการ"}
                  </button>
                  {editingId && (
                    <button type="button" onClick={handleCancel} className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300 transition">
                      ยกเลิก
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 รายการบริการ ({services.length})</h2>
              {services.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">ไม่พบข้อมูลบริการ กรุณารัน Seed Script หรือเพิ่มใหม่</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
                  {services.map(s => (
                    <div key={s._id} className="border border-gray-100 rounded-xl p-5 flex justify-between items-center hover:bg-blue-50 transition">
                      <div className="flex gap-4 items-center">
                        <img src={s.imageUrl || 'https://via.placeholder.com/150'} alt={s.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                        <div>
                          <h3 className="font-bold text-gray-800">{s.name}</h3>
                          <p className="text-sm text-gray-500">฿{s.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(s)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition">✏️</button>
                        <button onClick={() => handleDelete(s._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminService;