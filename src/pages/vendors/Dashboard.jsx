// import React from "react";
// import { motion } from "framer-motion";
// import {
//   Search,
//   Calendar,
//   DollarSign,
//   Star,
//   MessageSquare,
//   // MoreVertical,
//   ArrowUpRight,
//   TrendingUp,
//   Clock,
//   // CheckCircle2,
//   ChevronRight,
// } from "lucide-react";

// const VendorDashboard = () => {
//   const bookings = [
//     {
//       id: 1,
//       client: "Sarah Johnson",
//       service: "Wedding Catering",
//       date: "12 May 2026",
//       status: "Pending",
//       amount: "₦850,000",
//     },
//     {
//       id: 2,
//       client: "Michael David",
//       service: "Birthday Catering",
//       date: "18 May 2026",
//       status: "Confirmed",
//       amount: "₦120,000",
//     },
//     {
//       id: 3,
//       client: "Precious Events",
//       service: "Corporate Event",
//       date: "25 May 2026",
//       status: "Completed",
//       amount: "₦450,000",
//     },
//   ];

//   // Animation Variants
//   const containerVars = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
//   };

//   const itemVars = {
//     initial: { opacity: 0, y: 20 },
//     animate: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900'>
//       <main className='max-w-7xl mx-auto p-6 lg:p-10'>
//         {/* Header Section */}
//         <header className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12'>
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <h2 className='text-4xl font-black tracking-tight text-gray-900'>
//               Welcome <span className='text-purple-600'>back!</span>
//             </h2>
//             <p className='text-gray-500 mt-1 font-medium'>
//               Here is what's happening with your services today.
//             </p>
//           </motion.div>

//           <div className='flex items-center gap-4'>
//             <div className='relative group flex-1 lg:w-[350px]'>
//               <Search
//                 className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
//                 size={20}
//               />
//               <input
//                 type='text'
//                 placeholder='Search bookings or clients...'
//                 className='w-full bg-white border-2 border-transparent rounded-[1.25rem] pl-12 pr-4 py-3.5 shadow-sm outline-none focus:border-purple-100 focus:ring-4 focus:ring-purple-50 transition-all font-medium'
//               />
//             </div>
//             <button className='bg-white p-3.5 rounded-[1.25rem] border border-gray-100 shadow-sm hover:bg-gray-50 transition-all'>
//               <TrendingUp className='text-gray-600' size={22} />
//             </button>
//           </div>
//         </header>

//         {/* Stats Grid */}
//         <motion.section
//           variants={containerVars}
//           initial='initial'
//           animate='animate'
//           className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12'
//         >
//           {[
//             {
//               label: "Total Bookings",
//               val: "28",
//               icon: <Calendar />,
//               color: "purple",
//               trend: "+12%",
//             },
//             {
//               label: "Total Earnings",
//               val: "₦2.4M",
//               icon: <DollarSign />,
//               color: "green",
//               trend: "+8.4%",
//             },
//             {
//               label: "Average Rating",
//               val: "4.9",
//               icon: <Star />,
//               color: "yellow",
//               trend: "0.2",
//             },
//             {
//               label: "New Messages",
//               val: "12",
//               icon: <MessageSquare />,
//               color: "blue",
//               trend: "5 new",
//             },
//           ].map((stat, i) => (
//             <motion.div
//               key={i}
//               variants={itemVars}
//               whileHover={{ y: -5 }}
//               className='bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100 relative overflow-hidden group'
//             >
//               <div className='flex items-start justify-between relative z-10'>
//                 <div>
//                   <p className='text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1'>
//                     {stat.label}
//                   </p>
//                   <h3 className='text-3xl font-black text-gray-900'>
//                     {stat.val}
//                   </h3>
//                   <div
//                     className={`mt-2 text-[10px] font-bold px-2 py-1 rounded-lg inline-block
//                     ${stat.color === "green" ? "bg-green-50 text-green-600" : "bg-purple-50 text-purple-600"}`}
//                   >
//                     {stat.trend} this month
//                   </div>
//                 </div>
//                 <div
//                   className={`bg-${stat.color}-50 p-4 rounded-2xl text-${stat.color}-600 transition-colors group-hover:bg-${stat.color}-600 group-hover:text-white`}
//                 >
//                   {React.cloneElement(stat.icon, { size: 24 })}
//                 </div>
//               </div>
//               <div className='absolute -bottom-6 -right-6 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-500 -z-0 opacity-50' />
//             </motion.div>
//           ))}
//         </motion.section>

//         {/* Recent Bookings Table Container */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className='bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden'
//         >
//           <div className='p-8 border-b border-gray-50 flex items-center justify-between'>
//             <div>
//               <h3 className='text-2xl font-black text-gray-900'>
//                 Recent Bookings
//               </h3>
//               <p className='text-sm text-gray-400 font-medium'>
//                 Your latest 15 interactions
//               </p>
//             </div>
//             <button className='flex items-center gap-2 text-purple-600 font-black text-sm hover:gap-3 transition-all'>
//               View All Bookings <ChevronRight size={18} />
//             </button>
//           </div>

//           <div className='overflow-x-auto'>
//             <table className='w-full text-left border-collapse'>
//               <thead>
//                 <tr className='bg-gray-50/50'>
//                   <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest'>
//                     Client Name
//                   </th>
//                   <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest'>
//                     Service Type
//                   </th>
//                   <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest'>
//                     Event Date
//                   </th>
//                   <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest'>
//                     Revenue
//                   </th>
//                   <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest'>
//                     Status
//                   </th>
//                   <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest'></th>
//                 </tr>
//               </thead>

//               <tbody className='divide-y divide-gray-50'>
//                 {bookings.map((booking) => (
//                   <tr
//                     key={booking.id}
//                     className='group hover:bg-gray-50/80 transition-colors'
//                   >
//                     <td className='px-8 py-6'>
//                       <div className='flex items-center gap-3'>
//                         <div className='w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold'>
//                           {booking.client[0]}
//                         </div>
//                         <span className='font-bold text-gray-900'>
//                           {booking.client}
//                         </span>
//                       </div>
//                     </td>
//                     <td className='px-8 py-6'>
//                       <span className='text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg'>
//                         {booking.service}
//                       </span>
//                     </td>
//                     <td className='px-8 py-6'>
//                       <div className='flex items-center gap-2 text-sm font-bold text-gray-500'>
//                         <Clock size={14} />
//                         {booking.date}
//                       </div>
//                     </td>
//                     <td className='px-8 py-6 font-black text-gray-900'>
//                       {booking.amount}
//                     </td>
//                     <td className='px-8 py-6'>
//                       <span
//                         className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider
//                         ${
//                           booking.status === "Pending"
//                             ? "bg-yellow-50 text-yellow-600"
//                             : booking.status === "Confirmed"
//                               ? "bg-green-50 text-green-600"
//                               : "bg-blue-50 text-blue-600"
//                         }`}
//                       >
//                         <div
//                           className={`w-1.5 h-1.5 rounded-full ${
//                             booking.status === "Pending"
//                               ? "bg-yellow-600"
//                               : booking.status === "Confirmed"
//                                 ? "bg-green-600"
//                                 : "bg-blue-600"
//                           }`}
//                         />
//                         {booking.status}
//                       </span>
//                     </td>
//                     <td className='px-8 py-6'>
//                       <button className='p-2.5 rounded-xl hover:bg-white hover:shadow-md transition-all text-gray-400 hover:text-purple-600'>
//                         <ArrowUpRight size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className='p-6 bg-gray-50/30 flex justify-center'>
//             <p className='text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]'>
//               End of recent activity
//             </p>
//           </div>
//         </motion.section>
//       </main>
//     </div>
//   );
// };

// export default VendorDashboard;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  DollarSign,
  Star,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";

// Firebase
import { db, auth } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const VendorDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  // REAL TIME FETCH
  useEffect(() => {
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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // CALCULATED STATS (REAL DATA)
  const totalBookings = bookings.length;

  const totalEarnings = bookings.reduce((sum, b) => {
    const amount = Number(b.amount || 0);
    return sum + amount;
  }, 0);

  const confirmedBookings = bookings.filter(
    (b) => b.status === "Confirmed"
  ).length;

  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;

  // Animation Variants
  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900'>
      <main className='max-w-7xl mx-auto p-6 lg:p-10'>
        {/* Header */}
        <header className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className='text-4xl font-black tracking-tight text-gray-900'>
              Welcome <span className='text-purple-600'>back!</span>
            </h2>
            <p className='text-gray-500 mt-1 font-medium'>
              Here is what's happening with your services today.
            </p>
          </motion.div>

          <div className='flex items-center gap-4'>
            <div className='relative group flex-1 lg:w-[350px]'>
              <Search
                className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                size={20}
              />
              <input
                type='text'
                placeholder='Search bookings or clients...'
                className='w-full bg-white border-2 border-transparent rounded-[1.25rem] pl-12 pr-4 py-3.5 shadow-sm outline-none focus:border-purple-100 focus:ring-4 focus:ring-purple-50 transition-all font-medium'
              />
            </div>
            <button className='bg-white p-3.5 rounded-[1.25rem] border border-gray-100 shadow-sm hover:bg-gray-50 transition-all'>
              <TrendingUp className='text-gray-600' size={22} />
            </button>
          </div>
        </header>

        {/* STATS */}
        <motion.section
          variants={containerVars}
          initial='initial'
          animate='animate'
          className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12'
        >
          {[
            {
              label: "Total Bookings",
              val: totalBookings,
              icon: <Calendar />,
              color: "purple",
              trend: "+ live",
            },
            {
              label: "Total Earnings",
              val: `₦${totalEarnings.toLocaleString()}`,
              icon: <DollarSign />,
              color: "green",
              trend: "+ live",
            },
            {
              label: "Confirmed",
              val: confirmedBookings,
              icon: <Star />,
              color: "yellow",
              trend: "active",
            },
            {
              label: "Pending",
              val: pendingBookings,
              icon: <MessageSquare />,
              color: "blue",
              trend: "waiting",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVars}
              whileHover={{ y: -5 }}
              className='bg-white p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-100'
            >
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1'>
                    {stat.label}
                  </p>
                  <h3 className='text-3xl font-black text-gray-900'>
                    {stat.val}
                  </h3>
                </div>

                <div className='bg-purple-50 p-4 rounded-2xl text-purple-600'>
                  {React.cloneElement(stat.icon, { size: 24 })}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* BOOKINGS TABLE */}
        <motion.section className='bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden'>
          <div className='p-8 border-b border-gray-50 flex items-center justify-between'>
            <div>
              <h3 className='text-2xl font-black text-gray-900'>
                Recent Bookings
              </h3>
              <p className='text-sm text-gray-400 font-medium'>
                Your latest live bookings
              </p>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-gray-50/50'>
                  <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase'>
                    Client Name
                  </th>
                  <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase'>
                    Service
                  </th>
                  <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase'>
                    Date
                  </th>
                  <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase'>
                    Revenue
                  </th>
                  <th className='px-8 py-5 text-[11px] font-black text-gray-400 uppercase'>
                    Status
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-50'>
                {bookings.map((booking) => (
                  <tr key={booking.id} className='hover:bg-gray-50/80'>
                    <td className='px-8 py-6 font-bold'>
                      {booking.clientName}
                    </td>

                    <td className='px-8 py-6 text-gray-600'>
                      {booking.service}
                    </td>

                    <td className='px-8 py-6 flex items-center gap-2 text-gray-500'>
                      <Clock size={14} />
                      {booking.date}
                    </td>

                    <td className='px-8 py-6 font-black'>
                      ₦{Number(booking.amount || 0).toLocaleString()}
                    </td>

                    <td className='px-8 py-6'>
                      <span
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase
                        ${
                          booking.status === "Pending"
                            ? "bg-yellow-50 text-yellow-600"
                            : booking.status === "Confirmed"
                              ? "bg-green-50 text-green-600"
                              : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td className='px-8 py-6'>
                      <ArrowUpRight />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default VendorDashboard;
