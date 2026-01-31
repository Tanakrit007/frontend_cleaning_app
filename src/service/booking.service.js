import api from "./api";

const API_URL = import.meta.env.VITE_BOOKING_URL || "/api/bookings";

const BookingService = {
  // ✅ สำหรับการสร้างการจองใหม่
  createBooking: (bookingData) => {
    return api.post(API_URL, bookingData);
  },

  // ✅ สำหรับ User ดึงประวัติของตัวเอง (ยิงไปที่ /my-bookings)
  getUserBookings: () => {
    return api.get(`${API_URL}/my-bookings`);
  },

  // ✅ สำหรับ Admin ดึงการจองทั้งหมด (เพิ่มส่วนนี้เข้าไป)
  getAllBookings: () => {
    return api.get(API_URL); 
  },
};

export default BookingService;