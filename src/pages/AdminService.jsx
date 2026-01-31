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

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-gray-600">กำลังโหลดบริการ...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">⚙️ จัดการบริการ</h1>
          <p className="text-gray-600">เพิ่ม แก้ไข หรือลบบริการทำความสะอาด</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {editingId ? "✏️ แก้ไขบริการ" : "➕ เพิ่มบริการใหม่"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📝 ชื่อบริการ</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="เช่น ทำความสะอาดลึก" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">📄 รายละเอียด</label>
                  <textarea 
                    name="description" 
                    placeholder="อธิบายรายละเอียดบริการ..." 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows="3"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">💰 ราคา (บาท)</label>
                  <input 
                    type="number" 
                    name="price" 
                    placeholder="500" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    min="0"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">🖼️ URL รูปภาพ (ไม่บังคับ)</label>
                  <input 
                    type="text" 
                    name="imageUrl" 
                    placeholder="https://..." 
                    value={formData.imageUrl} 
                    onChange={handleInputChange} 
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">💡 ถ้าไม่ใส่จะใช้รูปพื้นฐาน</p>
                </div>

                <div className="flex gap-2 pt-4">
                  <button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition text-lg"
                  >
                    {editingId ? "💾 บันทึก" : "✅ เพิ่มบริการ"}
                  </button>
                  {editingId && (
                    <button 
                      type="button" 
                      onClick={handleCancel} 
                      className="flex-1 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition"
                    >
                      ยกเลิก
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Services List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 รายการบริการ ({services.length})</h2>
              
              {services.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">ยังไม่มีบริการ เริ่มต้นโดยการเพิ่มบริการใหม่</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {services.map(s => (
                    <div key={s._id} className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <h3 className="font-bold text-lg text-gray-800 mb-1">{s.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{s.description}</p>
                          <div className="flex gap-4 items-center">
                            <span className="text-2xl font-bold text-blue-600">{s.price}฿</span>
                            {s.imageUrl && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">🖼️ มีรูป</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEdit(s)} 
                            className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-4 py-2 rounded-lg transition shadow-md"
                          >
                            ✏️ แก้ไข
                          </button>
                          <button 
                            onClick={() => handleDelete(s._id)} 
                            className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition shadow-md"
                          >
                            🗑️ ลบ
                          </button>
                        </div>
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