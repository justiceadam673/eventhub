import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase"; // Adjust this relative path if necessary
import {
  TrendingUp,
  ArrowUpRight,
  Wallet,
  Clock,
  CreditCard,
  Filter,
  Download,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  Loader2,
} from "lucide-react";

const VendorEarnings = () => {
  const [hoveredChart, setHoveredChart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [monthlyData, setMonthlyData] = useState(Array(12).fill(0));
  const [totalWithdrawn, setTotalWithdrawn] = useState(0);

  // Helper utility to format currency as Naira
  const formatNaira = (num) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // REAL TIME SYNC WITH "BOOKINGS" COLLECTION
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Fetch total withdrawn metadata from vendor profile document once
    const fetchWithdrawnBalance = async () => {
      try {
        const vendorDocRef = doc(db, "vendors", user.uid);
        const vendorDocSnap = await getDoc(vendorDocRef);
        if (vendorDocSnap.exists()) {
          setTotalWithdrawn(vendorDocSnap.data().totalWithdrawn || 0);
        }
      } catch (err) {
        console.error("Error fetching withdrawn data:", err);
      }
    };
    fetchWithdrawnBalance();

    // Query identical to VendorDashboard
    const q = query(
      collection(db, "bookings"),
      where("vendorId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedBookings = snapshot.docs.map((doc) => {
        const data = doc.data();

        // Safely parse out dates whether stored as Firestore Timestamp or text strings
        let parsedDate = new Date();
        if (data.date?.toDate) {
          parsedDate = data.date.toDate();
        } else if (data.date) {
          parsedDate = new Date(data.date);
        }

        return {
          id: doc.id,
          ...data,
          rawDate: parsedDate,
        };
      });

      // Sort client-side by date descending
      fetchedBookings.sort((a, b) => b.rawDate - a.rawDate);
      setBookings(fetchedBookings);

      // Aggregate Monthly Graph (Only counting Confirmed/Completed revenue for the current year)
      const currentYear = 2026;
      let monthlyAmounts = Array(12).fill(0);

      fetchedBookings.forEach((b) => {
        if (
          (b.status === "Confirmed" || b.status === "Completed") &&
          b.rawDate.getFullYear() === currentYear
        ) {
          const monthIdx = b.rawDate.getMonth();
          monthlyAmounts[monthIdx] += Number(b.amount || 0);
        }
      });

      setMonthlyData(monthlyAmounts);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // CALCULATED STATS (Synced directly with Dashboard formulas)
  const totalEarnings = bookings.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );

  const pendingPayout = bookings
    .filter((b) => b.status === "Pending")
    .reduce((sum, b) => sum + Number(b.amount || 0), 0);

  const currentMonthEarnings = bookings
    .filter((b) => {
      const now = new Date();
      return (
        (b.status === "Confirmed" || b.status === "Completed") &&
        b.rawDate.getMonth() === now.getMonth() &&
        b.rawDate.getFullYear() === 2026
      );
    })
    .reduce((sum, b) => sum + Number(b.amount || 0), 0);

  // QUICK INSIGHTS COMPUTATIONS
  const serviceBreakdown = {};
  bookings.forEach((b) => {
    if (b.status === "Confirmed" || b.status === "Completed") {
      serviceBreakdown[b.service] =
        (serviceBreakdown[b.service] || 0) + Number(b.amount || 0);
    }
  });

  let topService = "None";
  let maxServiceRevenue = 0;
  Object.entries(serviceBreakdown).forEach(([service, total]) => {
    if (total > maxServiceRevenue) {
      maxServiceRevenue = total;
      topService = service;
    }
  });

  const confirmedOrCompletedCount = bookings.filter(
    (b) => b.status === "Confirmed" || b.status === "Completed"
  ).length;
  const avgBookingValue =
    confirmedOrCompletedCount > 0
      ? (totalEarnings - pendingPayout) / confirmedOrCompletedCount
      : 0;
  const topServicePercentage =
    totalEarnings > 0
      ? Math.round((maxServiceRevenue / totalEarnings) * 100)
      : 0;

  // Chart Scale Normalization Factor
  const maxMonthValue = Math.max(...monthlyData, 1);
  const normalizedChartData = monthlyData.map(
    (val) => (val / maxMonthValue) * 100
  );

  if (isLoading) {
    return (
      <div className='min-h-screen bg-[#F8F9FD] flex flex-col items-center justify-center gap-3'>
        <Loader2 size={40} className='animate-spin text-purple-600' />
        <p className='text-slate-500 font-bold text-sm'>
          Syncing financial records...
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#F8F9FD] font-sans text-slate-900 pb-20'>
      <main className='max-w-7xl mx-auto p-6 lg:p-10'>
        {/* Header Section */}
        <header className='flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className='flex items-center gap-2 mb-2'>
              <span className='px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest rounded-full'>
                Finance Hub
              </span>
            </div>
            <h1 className='text-4xl font-black tracking-tight text-slate-900'>
              Revenue <span className='text-purple-600'>Analytics</span>
            </h1>
            <p className='text-slate-500 mt-1 font-medium italic'>
              Monitor your financial growth and pending payouts.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-purple-600 hover:bg-slate-900 text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-sm shadow-xl shadow-purple-100'
          >
            <Wallet size={18} />
            Withdraw Funds
          </motion.button>
        </header>

        {/* Top Stats */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          {[
            {
              label: "Total Earnings",
              val: formatNaira(totalEarnings),
              color: "bg-green-500",
              icon: <TrendingUp className='text-white' />,
            },
            {
              label: "Current Month",
              val: formatNaira(currentMonthEarnings),
              color: "bg-purple-600",
              icon: <ArrowUpRight className='text-white' />,
            },
            {
              label: "Pending Payout",
              val: formatNaira(pendingPayout),
              color: "bg-orange-400",
              icon: <Clock className='text-white' />,
            },
            {
              label: "Total Withdrawn",
              val: formatNaira(totalWithdrawn),
              color: "bg-slate-900",
              icon: <CreditCard className='text-white' />,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className='bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between'
            >
              <div className='flex justify-between items-start mb-4'>
                <div className={`${stat.color} p-3 rounded-2xl shadow-lg`}>
                  {stat.icon}
                </div>
                <button className='text-slate-300 hover:text-purple-600 transition-colors'>
                  <MoreHorizontal size={20} />
                </button>
              </div>
              <div>
                <p className='text-[11px] font-black uppercase tracking-widest text-slate-400'>
                  {stat.label}
                </p>
                <h2 className='text-2xl font-black text-slate-900 mt-1 truncate'>
                  {stat.val}
                </h2>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
          {/* Chart Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='xl:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100'
          >
            <div className='flex items-center justify-between mb-10'>
              <div>
                <h3 className='text-2xl font-black text-slate-900'>
                  Growth Curve
                </h3>
                <p className='text-slate-400 font-bold text-sm'>
                  Monthly performance 2026
                </p>
              </div>
            </div>

            {/* Animated Bar Chart */}
            <div className='h-64 flex items-end justify-between gap-2 px-2'>
              {normalizedChartData.map((height, i) => (
                <div
                  key={i}
                  className='relative flex-1 group flex flex-col items-center'
                >
                  {hoveredChart === i && (
                    <div className='absolute -top-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md z-10 whitespace-nowrap'>
                      {formatNaira(monthlyData[i])}
                    </div>
                  )}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      delay: i * 0.03,
                      duration: 0.8,
                      ease: "circOut",
                    }}
                    onHoverStart={() => setHoveredChart(i)}
                    onHoverEnd={() => setHoveredChart(null)}
                    className={`w-full rounded-t-lg transition-all duration-300 cursor-pointer ${
                      hoveredChart === i ? "bg-purple-600" : "bg-purple-100"
                    }`}
                  />
                  <span className='text-[10px] font-black text-slate-300 mt-4 uppercase tracking-tighter'>
                    {
                      [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                      ][i]
                    }
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Activity Section */}
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden'
          >
            <div className='absolute top-[-10%] right-[-10%] w-32 h-32 bg-purple-500/20 rounded-full blur-3xl' />
            <h3 className='text-xl font-black mb-6 flex items-center gap-2'>
              Quick Insights{" "}
              <TrendingUp size={20} className='text-purple-400' />
            </h3>

            <div className='space-y-6'>
              {[
                {
                  title: "Top Revenue Generator",
                  val: topService,
                  sub: `${topServicePercentage}% of total returns`,
                },
                {
                  title: "Avg. Main Booking",
                  val: formatNaira(avgBookingValue),
                  sub: "Based on active confirmed bookings",
                },
                {
                  title: "Tracking Base",
                  val: `${bookings.length} Orders`,
                  sub: "Total aggregated count",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className='bg-white/5 border border-white/10 p-5 rounded-2xl'
                >
                  <p className='text-[10px] font-black text-purple-400 uppercase tracking-widest'>
                    {item.title}
                  </p>
                  <p className='text-xl font-black mt-1 truncate'>{item.val}</p>
                  <p className='text-xs text-slate-400 font-medium mt-1'>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Settlement Logs */}
        <section className='mt-12'>
          <div className='flex items-center justify-between mb-8 px-2'>
            <h3 className='text-2xl font-black text-slate-900'>
              Settlement Logs
            </h3>
            <div className='flex gap-3'>
              <button className='p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-purple-600 transition-all shadow-sm'>
                <Filter size={20} />
              </button>
              <button className='p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-purple-600 transition-all shadow-sm'>
                <Download size={20} />
              </button>
            </div>
          </div>

          <div className='space-y-4'>
            {bookings.length === 0 ? (
              <div className='text-center bg-white p-12 rounded-[2rem] border border-slate-100 text-slate-400 font-medium'>
                No bookings found for your profile.
              </div>
            ) : (
              bookings.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className='group bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-200 transition-all shadow-sm'
                >
                  <div className='flex items-center gap-5'>
                    <div className='w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-50 transition-colors'>
                      <CheckCircle2
                        className={
                          tx.status === "Confirmed" || tx.status === "Completed"
                            ? "text-green-500"
                            : "text-orange-400"
                        }
                        size={24}
                      />
                    </div>
                    <div>
                      <h4 className='text-lg font-black text-slate-900'>
                        {tx.service}
                      </h4>
                      <p className='text-sm font-bold text-slate-400'>
                        {tx.clientName || "Unnamed Client"}
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-wrap items-center gap-8 md:gap-12'>
                    <div className='flex items-center gap-2'>
                      <Calendar size={16} className='text-slate-300' />
                      <span className='text-sm font-black text-slate-500 tracking-tighter'>
                        {tx.date}
                      </span>
                    </div>

                    <div className='text-right min-w-[140px]'>
                      <p className='text-2xl font-black text-slate-900 tracking-tighter'>
                        {formatNaira(Number(tx.amount || 0))}
                      </p>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest ${
                          tx.status === "Confirmed" || tx.status === "Completed"
                            ? "text-green-500"
                            : "text-orange-400"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>

                    <button className='p-2 text-slate-300 hover:text-purple-600 transition-colors'>
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default VendorEarnings;
