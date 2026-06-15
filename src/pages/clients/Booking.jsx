import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Receipt,
  Search,
} from "lucide-react";
import { db } from "../../firebase"; // Adjust path as needed
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const ClientBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        // IMPORTANT: If you have user authentication, you should filter by the logged-in user's ID
        // const q = query(collection(db, "bookings"), where("clientId", "==", currentUser.uid), orderBy("createdAt", "desc"));

        // For now, fetching all bookings (Fallback query)
        const q = query(collection(db, "bookings"));
        const querySnapshot = await getDocs(q);

        const fetchedBookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(fetchedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Helper function to determine status badge styling
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: <CheckCircle2 size={16} />,
          label: "Approved",
        };
      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: <XCircle size={16} />,
          label: "Rejected",
        };
      case "pending":
      default:
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          icon: <Clock size={16} />,
          label: "Pending",
        };
    }
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(
    (b) =>
      b.vendorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.eventType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20'>
      {/* Header Background Decoration */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-linear-to-b from-purple-100/50 to-transparent blur-[100px] pointer-events-none -z-10' />

      <main className='max-w-7xl mx-auto p-6 lg:p-10 pt-12'>
        {/* Page Header & Controls */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12'>
          <div>
            <h1 className='text-4xl font-black mb-2 text-gray-900'>
              My Bookings
            </h1>
            <p className='text-gray-500 font-medium'>
              Track and manage all your vendor reservations
            </p>
          </div>

          <div className='relative w-full md:w-96'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              placeholder='Search by vendor or event type...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-purple-100 transition-all font-medium placeholder:text-gray-400'
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className='flex flex-col items-center justify-center py-32'>
            <div className='w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin' />
            <p className='mt-4 text-gray-500 font-bold'>
              Loading your bookings...
            </p>
          </div>
        ) : filteredBookings.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-[2.5rem] p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 max-w-2xl mx-auto mt-10'
          >
            <div className='w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6'>
              <Receipt size={40} className='text-purple-600' />
            </div>
            <h3 className='text-2xl font-black mb-3'>No bookings found</h3>
            <p className='text-gray-500 mb-8 font-medium'>
              {searchTerm
                ? "We couldn't find any bookings matching your search."
                : "You haven't made any bookings yet. Start exploring vendors to plan your next big event!"}
            </p>
          </motion.div>
        ) : (
          /* Bookings Grid */
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <AnimatePresence mode='popLayout'>
              {filteredBookings.map((booking) => {
                const status = getStatusConfig(booking.status);

                return (
                  <motion.div
                    key={booking.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className='bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col sm:flex-row gap-6 group hover:shadow-[0_20px_50px_rgba(147,51,234,0.08)] transition-all'
                  >
                    {/* Left side: Image & Status */}
                    <div className='w-full sm:w-40 shrink-0 flex flex-col gap-4'>
                      <div className='relative h-40 sm:h-32 rounded-2xl overflow-hidden bg-gray-100'>
                        {booking.vendorImage ? (
                          <img
                            src={booking.vendorImage}
                            alt={booking.vendorName}
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                          />
                        ) : (
                          <div className='w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs'>
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Dynamic Status Badge */}
                      <div
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider ${status.bg} ${status.text}`}
                      >
                        {status.icon}
                        {status.label}
                      </div>
                    </div>

                    {/* Right side: Details */}
                    <div className='flex-1 flex flex-col'>
                      <div className='flex justify-between items-start mb-2'>
                        <div>
                          <p className='text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1'>
                            {booking.eventType || "Event Booking"}
                          </p>
                          <h3 className='text-2xl font-black text-gray-900 leading-tight'>
                            {booking.vendorName || "Unknown Vendor"}
                          </h3>
                        </div>
                        <button className='p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors'>
                          <MoreVertical size={20} />
                        </button>
                      </div>

                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mt-4 mb-6'>
                        <div className='flex items-center gap-3 text-sm text-gray-600 font-medium'>
                          <div className='p-2 bg-gray-50 rounded-lg text-gray-400'>
                            <Calendar size={16} />
                          </div>
                          <span>{booking.date || "Date TBD"}</span>
                        </div>
                        <div className='flex items-center gap-3 text-sm text-gray-600 font-medium'>
                          <div className='p-2 bg-gray-50 rounded-lg text-gray-400'>
                            <MapPin size={16} />
                          </div>
                          <span className='truncate'>
                            {booking.location || "Location TBD"}
                          </span>
                        </div>
                        <div className='flex items-center gap-3 text-sm text-gray-600 font-medium'>
                          <div className='p-2 bg-gray-50 rounded-lg text-gray-400'>
                            <Users size={16} />
                          </div>
                          <span>
                            {booking.guestCount
                              ? `${booking.guestCount} Guests`
                              : "N/A"}
                          </span>
                        </div>
                        <div className='flex items-center gap-3 text-sm text-gray-600 font-medium'>
                          <div className='p-2 bg-gray-50 rounded-lg text-gray-400'>
                            <Receipt size={16} />
                          </div>
                          <span className='font-bold text-gray-900'>
                            {booking.totalPrice
                              ? `₦${Number(booking.totalPrice).toLocaleString()}`
                              : "Quote Pending"}
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button className='mt-auto w-full bg-gray-50 hover:bg-gray-900 text-gray-600 hover:text-white py-3 rounded-xl text-sm font-bold transition-colors'>
                        View Full Details
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientBookingsPage;
