import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Check,
  X,
  Filter,
} from "lucide-react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase"; // adjust path if needed

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 REAL-TIME FETCH
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "bookings"),
      where("vendorId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    });

    return () => unsubscribe();
  }, []);

  // 🔥 UPDATE STATUS (CONFIRM / REJECT)
  const updateStatus = async (id, newStatus) => {
    try {
      const ref = doc(db, "bookings", id);
      await updateDoc(ref, {
        status: newStatus,
      });
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesTab = activeTab === "All" || b.status === activeTab;
    const matchesSearch =
      b.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.eventType?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20'>
      <main className='max-w-7xl mx-auto p-6 lg:p-10'>
        {/* Header & Search */}
        <header className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pt-12'>
          <div>
            <h1 className='text-4xl font-black tracking-tight'>
              Event <span className='text-purple-600'>Roster</span>
            </h1>
            <p className='text-gray-500 mt-2 font-medium'>
              Tracking {filteredBookings.length} bookings under "{activeTab}".
            </p>
          </div>
          <div className='relative group w-full lg:w-[400px]'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
              size={20}
            />
            <input
              type='text'
              placeholder='Find a client or event...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-white border border-gray-100 rounded-2xl pl-12 pr-4 py-4 shadow-sm outline-none focus:border-purple-100 focus:ring-4 focus:ring-purple-50 transition-all font-bold'
            />
          </div>
        </header>

        {/* FILTER TABS */}
        <div className='flex items-center gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar'>
          <div className='bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1'>
            {["All", "Pending", "Confirmed", "Completed", "Rejected"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 rounded-xl font-black text-sm transition-all ${
                    activeTab === tab
                      ? "text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId='activeTab'
                      className='absolute inset-0 bg-purple-600 rounded-xl -z-0'
                    />
                  )}
                  <span className='relative z-10'>{tab}</span>
                </button>
              )
            )}
          </div>
          <button className='p-3 bg-white rounded-2xl border border-gray-100 text-gray-400 hover:text-purple-600'>
            <Filter size={20} />
          </button>
        </div>

        {/* BOOKINGS */}
        <motion.div layout className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
          <AnimatePresence mode='popLayout'>
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className='bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all group'
              >
                {/* HEADER */}
                <div className='flex justify-between items-start mb-8'>
                  <div>
                    <div className='flex items-center gap-2 mb-2'>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          booking.status === "Pending"
                            ? "bg-yellow-500"
                            : booking.status === "Confirmed"
                              ? "bg-green-500"
                              : booking.status === "Rejected"
                                ? "bg-red-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <span className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>
                        {booking.status}
                      </span>
                    </div>
                    <h2 className='text-2xl font-black text-gray-900'>
                      {booking.eventType || "Event"}
                    </h2>
                    <p className='text-gray-500 font-bold text-sm'>
                      {booking.service}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1'>
                      Quote
                    </p>
                    <span className='text-xl font-black text-gray-900'>
                      {booking.totalPrice
                        ? `₦${Number(booking.totalPrice).toLocaleString()}`
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* CLIENT */}
                <div className='flex items-center gap-4 bg-gray-50 p-4 rounded-2xl mb-8'>
                  <div className='w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center font-black text-purple-600'>
                    {booking.clientName?.[0] || "C"}
                  </div>
                  <div>
                    <h3 className='font-black text-gray-900'>
                      {booking.clientName || "Unknown Client"}
                    </h3>
                    <p className='text-xs text-gray-400 font-bold mt-1 uppercase tracking-tighter'>
                      Verified Client
                    </p>
                  </div>
                  <button className='ml-auto p-2 bg-white rounded-lg text-gray-400 hover:text-purple-600 transition-colors shadow-sm'>
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* META */}
                <div className='grid grid-cols-2 gap-4 mb-8'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2.5 bg-purple-50 text-purple-600 rounded-xl'>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter'>
                        Date
                      </p>
                      <p className='text-sm font-black'>
                        {booking.date || "TBD"}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='p-2.5 bg-pink-50 text-pink-600 rounded-xl'>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter'>
                        Location
                      </p>
                      <p className='text-sm font-black truncate'>
                        {booking.location || "TBD"}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='p-2.5 bg-blue-50 text-blue-600 rounded-xl'>
                      <Users size={18} />
                    </div>
                    <div>
                      <p className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter'>
                        Guests
                      </p>
                      <p className='text-sm font-black'>
                        {booking.guestCount || 0} Pax
                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className='flex gap-3'>
                  <button className='flex-[2] bg-gray-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-purple-600 transition-colors'>
                    Full Details
                  </button>

                  {booking.status === "Pending" && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateStatus(booking.id, "Confirmed")}
                        className='flex-1 bg-green-50 text-green-600 p-4 rounded-2xl border-2 border-green-100 hover:bg-green-600 hover:text-white transition-all flex justify-center items-center'
                      >
                        <Check size={20} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateStatus(booking.id, "Rejected")}
                        className='flex-1 bg-red-50 text-red-500 p-4 rounded-2xl border-2 border-red-100 hover:bg-red-500 hover:text-white transition-all flex justify-center items-center'
                      >
                        <X size={20} />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default VendorBookings;
