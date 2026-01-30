import api from "./api";

const BookingService = {
  create: async (bookingData) => {
    return await api.post("/bookings", bookingData);
  },
  getByUser: async (username) => {
    return await api.get(`/bookings/${username}`);
  }
};

export default BookingService;