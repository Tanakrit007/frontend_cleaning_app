import { useState, useEffect } from "react";
import api from "../service/api";

const AdminService = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
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
        await api.put(`/services/${editingId}`, formData);
        alert("อัปเดตบริการสำเร็จ!");
        setEditingId(null);
      } else {
        await api.post("/services", formData);
        alert("เพิ่มบริการสำเร็จ!");
      }
      setFormData({ name: "", description: "", price: "", imageUrl: "" });
      fetchServices();
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
        await api.delete(`/services/${id}`);
        alert("ลบบริการสำเร็จ!");
        fetchServices();
      } catch (err) {
        alert("เกิดข้อผิดพลาด: " + err.message);
      }
    }
  };

  if (loading) return <div className="text-center mt-10">กำลังโหลด...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">จัดการบริการทำความสะอาด (Admin)</h2>
      
      {/* ฟอร์มเพิ่ม/แก้ไขบริการ */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4">{editingId ? "แก้ไขบริการ" : "เพิ่มบริการใหม่"}</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            type="text" name="name" placeholder="ชื่อบริการ" 
            value={formData.name} onChange={handleInputChange} 
            className="p-2 border rounded" required 
          />
          <input 
            type="text" name="description" placeholder="รายละเอียด" 
            value={formData.description} onChange={handleInputChange} 
            className="p-2 border rounded md:col-span-2" required 
          />
          <input 
            type="number" name="price" placeholder="ราคา (บาท)" 
            value={formData.price} onChange={handleInputChange} 
            className="p-2 border rounded" required 
          />
          <input 
            type="text" name="imageUrl" placeholder="URL รูปภาพ" 
            value={formData.imageUrl} onChange={handleInputChange} 
            className="p-2 border rounded" 
          />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              {editingId ? "บันทึกการแก้ไข" : "เพิ่มบริการ"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="flex-1 bg-gray-400 text-white p-2 rounded hover:bg-gray-500">
                ยกเลิก
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ตารางแสดงรายการบริการ */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">ชื่อบริการ</th>
              <th className="p-3 text-left">รายละเอียด</th>
              <th className="p-3 text-right">ราคา</th>
              <th className="p-3 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3 text-sm text-gray-600">{s.description}</td>
                <td className="p-3 text-right font-bold">{s.price} บาท</td>
                <td className="p-3 text-center flex gap-2 justify-center">
                  <button 
                    onClick={() => handleEdit(s)} 
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    แก้ไข
                  </button>
                  <button 
                    onClick={() => handleDelete(s._id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminService;