import api from "./api";

const CleaningService = {
  // ดึงข้อมูลบริการทั้งหมด
  getAllServices: async () => {
    return await api.get("/services");
  },
  // ส่งข้อมูลการจอง
  createBooking: async (bookingData) => {
    return await api.post("/bookings", bookingData);
  },
  // ดึงประวัติการจองตามชื่อผู้ใช้
  getUserBookings: async (username) => {
    return await api.get(`/bookings/${username}`);
  },
  // ดึงรายการจองทั้งหมด (Admin)
  getAllBookings: async () => {
    return await api.get("/bookings");
  },
  // อัปเดตสถานะการจอง (Admin)
  updateBookingStatus: async (bookingId, status) => {
    return await api.put(`/bookings/${bookingId}/status`, { status });
  }
};

export default CleaningService;