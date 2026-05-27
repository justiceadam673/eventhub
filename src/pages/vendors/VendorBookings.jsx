import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  CreditCard,
  ChevronRight,
  Check,
  X,
  Clock,
  Filter,
} from "lucide-react";

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState("All");

  const bookings = [
    {
      id: 1,
      client: "Sarah Johnson",
      event: "Wedding Ceremony",
      service: "Premium Catering",
      date: "12 May 2026",
      location: "Abuja",
      guests: 300,
      amount: "₦450,000",
      status: "Pending",
    },
    {
      id: 2,
      client: "Michael David",
      event: "Birthday Party",
      service: "Outdoor Catering",
      date: "18 May 2026",
      location: "Lagos",
      guests: 120,
      amount: "₦180,000",
      status: "Confirmed",
    },
    {
      id: 3,
      client: "Precious Events",
      event: "Corporate Event",
      service: "Executive Catering",
      date: "25 May 2026",
      location: "Jos",
      guests: 500,
      amount: "₦800,000",
      status: "Completed",
    },
  ];

  const filteredBookings =
    activeTab === "All"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20'>
      <main className='max-w-7xl mx-auto p-6 lg:p-10'>
        {/* Header Section */}
        <header className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10'>
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className='text-4xl font-black tracking-tight'>
              Event <span className='text-purple-600'>Roster</span>
            </h1>
            <p className='text-gray-500 mt-2 font-medium'>
              Tracking {filteredBookings.length} bookings under "{activeTab}"
              status.
            </p>
          </motion.div> */}

          {/* Refined Search */}
          <div className='relative group w-full lg:w-[400px]'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
              size={20}
            />
            <input
              type='text'
              placeholder='Find a client or event...'
              className='w-full bg-white border-2 border-transparent rounded-2xl pl-12 pr-4 py-4 shadow-sm outline-none focus:border-purple-100 focus:ring-4 focus:ring-purple-50 transition-all font-bold'
            />
          </div>
        </header>

        {/* Filter Tabs */}
        <div className='flex items-center gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar'>
          <div className='bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1'>
            {["All", "Pending", "Confirmed", "Completed"].map((tab) => (
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
            ))}
          </div>
          <button className='p-3 bg-white rounded-2xl border border-gray-100 text-gray-400 hover:text-purple-600 transition-colors shadow-sm'>
            <Filter size={20} />
          </button>
        </div>

        {/* Bookings Grid */}
        <motion.div layout className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
          <AnimatePresence mode='popLayout'>
            {filteredBookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className='bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all group'
              >
                {/* Card Header */}
                <div className='flex items-start justify-between mb-8'>
                  <div className='space-y-1'>
                    <div className='flex items-center gap-2'>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          booking.status === "Pending"
                            ? "bg-yellow-500"
                            : booking.status === "Confirmed"
                              ? "bg-green-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <span className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>
                        {booking.status}
                      </span>
                    </div>
                    <h2 className='text-2xl font-black text-gray-900 group-hover:text-purple-600 transition-colors'>
                      {booking.event}
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
                      {booking.amount}
                    </span>
                  </div>
                </div>

                {/* Client Profile Snippet */}
                <div className='flex items-center gap-4 bg-gray-50 p-4 rounded-2xl mb-8'>
                  <div className='w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-100 to-pink-100 flex items-center justify-center font-black text-purple-600 border-2 border-white shadow-sm'>
                    {booking.client[0]}
                  </div>
                  <div>
                    <h3 className='font-black text-gray-900 leading-none'>
                      {booking.client}
                    </h3>
                    <p className='text-xs text-gray-400 font-bold mt-1 uppercase tracking-tighter'>
                      Verified Client
                    </p>
                  </div>
                  <button className='ml-auto p-2 bg-white rounded-lg text-gray-400 hover:text-purple-600 transition-colors shadow-sm'>
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Meta Grid */}
                <div className='grid grid-cols-2 gap-4 mb-8'>
                  <div className='flex items-center gap-3'>
                    <div className='p-2.5 bg-purple-50 text-purple-600 rounded-xl'>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter'>
                        Date
                      </p>
                      <p className='text-sm font-black'>{booking.date}</p>
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
                      <p className='text-sm font-black'>{booking.location}</p>
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
                      <p className='text-sm font-black'>{booking.guests} Pax</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='p-2.5 bg-green-50 text-green-600 rounded-xl'>
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className='text-[10px] font-bold text-gray-400 uppercase tracking-tighter'>
                        Status
                      </p>
                      <p className='text-sm font-black'>Confirmed</p>
                    </div>
                  </div>
                </div>

                {/* Dynamic Actions */}
                <div className='flex gap-3'>
                  <button className='flex-[2] bg-gray-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-purple-600 transition-all shadow-lg shadow-gray-100'>
                    Full Details
                  </button>

                  {booking.status === "Pending" && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex-1 bg-green-50 text-green-600 p-4 rounded-2xl flex items-center justify-center border-2 border-green-100 hover:bg-green-600 hover:text-white transition-all'
                      >
                        <Check size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='flex-1 bg-red-50 text-red-500 p-4 rounded-2xl flex items-center justify-center border-2 border-red-100 hover:bg-red-500 hover:text-white transition-all'
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

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Calendar,
//   MapPin,
//   Users,
//   ChevronRight,
//   Check,
//   X,
//   Clock,
//   Filter,
// } from "lucide-react";

// import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase"; // adjust path if needed

// const VendorBookings = () => {
//   const [activeTab, setActiveTab] = useState("All");
//   const [bookings, setBookings] = useState([]);

//   const user = auth.currentUser;

//   // 🔥 REAL-TIME FETCH
//   useEffect(() => {
//     if (!user) return;

//     const q = query(
//       collection(db, "bookings"),
//       where("vendorId", "==", user.uid)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setBookings(data);
//     });

//     return () => unsubscribe();
//   }, [user]);

//   // 🔥 UPDATE STATUS (ACCEPT / REJECT)
//   const updateStatus = async (id, status) => {
//     try {
//       const ref = doc(db, "bookings", id);
//       await updateDoc(ref, {
//         status,
//       });
//     } catch (err) {
//       console.error("Error updating booking:", err);
//     }
//   };

//   const filteredBookings =
//     activeTab === "All"
//       ? bookings
//       : bookings.filter((b) => b.status === activeTab);

//   return (
//     <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20'>
//       <main className='max-w-7xl mx-auto p-6 lg:p-10'>

//         {/* SEARCH (UNCHANGED UI) */}
//         <header className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10'>
//           <div className='relative group w-full lg:w-[400px]'>
//             <Search
//               className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
//               size={20}
//             />
//             <input
//               type='text'
//               placeholder='Find a client or event...'
//               className='w-full bg-white border-2 border-transparent rounded-2xl pl-12 pr-4 py-4 shadow-sm outline-none focus:border-purple-100 focus:ring-4 focus:ring-purple-50 transition-all font-bold'
//             />
//           </div>
//         </header>

//         {/* FILTER TABS (UNCHANGED UI) */}
//         <div className='flex items-center gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar'>
//           <div className='bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 flex gap-1'>
//             {["All", "Pending", "Confirmed", "Completed", "Rejected"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`relative px-6 py-2.5 rounded-xl font-black text-sm transition-all ${
//                   activeTab === tab ? "text-white" : "text-gray-500 hover:bg-gray-50"
//                 }`}
//               >
//                 {activeTab === tab && (
//                   <motion.div
//                     layoutId='activeTab'
//                     className='absolute inset-0 bg-purple-600 rounded-xl -z-0'
//                   />
//                 )}
//                 <span className='relative z-10'>{tab}</span>
//               </button>
//             ))}
//           </div>
//           <button className='p-3 bg-white rounded-2xl border border-gray-100 text-gray-400 hover:text-purple-600'>
//             <Filter size={20} />
//           </button>
//         </div>

//         {/* BOOKINGS */}
//         <motion.div layout className='grid grid-cols-1 xl:grid-cols-2 gap-8'>
//           <AnimatePresence mode='popLayout'>
//             {filteredBookings.map((booking) => (
//               <motion.div
//                 key={booking.id}
//                 layout
//                 className='bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100'
//               >

//                 {/* HEADER */}
//                 <div className='flex justify-between mb-8'>
//                   <div>
//                     <h2 className='text-2xl font-black'>{booking.event}</h2>
//                     <p className='text-gray-500 font-bold'>{booking.service}</p>
//                   </div>
//                   <span className='font-black text-gray-900'>{booking.amount}</span>
//                 </div>

//                 {/* CLIENT */}
//                 <div className='flex items-center gap-4 bg-gray-50 p-4 rounded-2xl mb-8'>
//                   <div className='w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center font-black text-purple-600'>
//                     {booking.client?.[0]}
//                   </div>
//                   <div>
//                     <h3 className='font-black'>{booking.client}</h3>
//                   </div>
//                 </div>

//                 {/* META */}
//                 <div className='grid grid-cols-2 gap-4 mb-8'>
//                   <p className='font-bold'>📅 {booking.date}</p>
//                   <p className='font-bold'>📍 {booking.location}</p>
//                   <p className='font-bold'>👥 {booking.guests} guests</p>
//                   <p className='font-bold'>📌 {booking.status}</p>
//                 </div>

//                 {/* ACTIONS */}
//                 <div className='flex gap-3'>
//                   <button className='flex-[2] bg-gray-900 text-white py-4 rounded-2xl font-black'>
//                     Full Details
//                   </button>

//                   {booking.status === "Pending" && (
//                     <>
//                       <button
//                         onClick={() => updateStatus(booking.id, "Confirmed")}
//                         className='flex-1 bg-green-50 text-green-600 p-4 rounded-2xl'
//                       >
//                         <Check size={20} />
//                       </button>

//                       <button
//                         onClick={() => updateStatus(booking.id, "Rejected")}
//                         className='flex-1 bg-red-50 text-red-500 p-4 rounded-2xl'
//                       >
//                         <X size={20} />
//                       </button>
//                     </>
//                   )}
//                 </div>

//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//       </main>
//     </div>
//   );
// };

// export default VendorBookings;
