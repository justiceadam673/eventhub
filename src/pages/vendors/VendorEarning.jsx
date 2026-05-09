import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

const VendorEarnings = () => {
  const [hoveredChart, setHoveredChart] = useState(null);

  const transactions = [
    {
      id: 1,
      client: "Sarah Johnson",
      service: "Wedding Catering",
      date: "12 May 2026",
      amount: "₦450,000",
      status: "Paid",
    },
    {
      id: 2,
      client: "Michael David",
      service: "Birthday Catering",
      date: "18 May 2026",
      amount: "₦180,000",
      status: "Pending",
    },
    {
      id: 3,
      client: "Precious Events",
      service: "Corporate Catering",
      date: "25 May 2026",
      amount: "₦800,000",
      status: "Paid",
    },
    {
      id: 4,
      client: "Samuel Peters",
      service: "Outdoor Catering",
      date: "30 May 2026",
      amount: "₦250,000",
      status: "Paid",
    },
  ];

  // Mock data for the animated chart
  const monthlyData = [40, 70, 45, 90, 65, 80, 50, 85, 100, 75, 60, 95];

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

        {/* Top Stats - Bento Style */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
          {[
            {
              label: "Total Revenue",
              val: "₦4.2M",
              color: "bg-green-500",
              icon: <TrendingUp className='text-white' />,
            },
            {
              label: "Current Month",
              val: "₦1.2M",
              color: "bg-purple-600",
              icon: <ArrowUpRight className='text-white' />,
            },
            {
              label: "Pending Payout",
              val: "₦430K",
              color: "bg-orange-400",
              icon: <Clock className='text-white' />,
            },
            {
              label: "Total Withdrawn",
              val: "₦3.5M",
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
                <div
                  className={`${stat.color} p-3 rounded-2xl shadow-lg shadow-opacity-20`}
                >
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
                <h2 className='text-3xl font-black text-slate-900 mt-1'>
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
              <div className='flex bg-slate-50 p-1.5 rounded-xl border border-slate-100'>
                <button className='px-4 py-2 bg-white rounded-lg text-xs font-black shadow-sm'>
                  Yearly
                </button>
                <button className='px-4 py-2 text-xs font-black text-slate-400'>
                  Monthly
                </button>
              </div>
            </div>

            {/* Animated Bar Chart */}
            <div className='h-64 flex items-end justify-between gap-2 px-2'>
              {monthlyData.map((height, i) => (
                <div
                  key={i}
                  className='relative flex-1 group flex flex-col items-center'
                >
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      delay: i * 0.05,
                      duration: 1,
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
                  title: "Top Service",
                  val: "Wedding Catering",
                  sub: "60% of total revenue",
                },
                {
                  title: "Avg. Booking",
                  val: "₦320,000",
                  sub: "+12% from last month",
                },
                {
                  title: "Client Retention",
                  val: "88%",
                  sub: "Highly satisfied base",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className='bg-white/5 border border-white/10 p-5 rounded-2xl'
                >
                  <p className='text-[10px] font-black text-purple-400 uppercase tracking-widest'>
                    {item.title}
                  </p>
                  <p className='text-xl font-black mt-1'>{item.val}</p>
                  <p className='text-xs text-slate-400 font-medium mt-1'>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>

            <button className='w-full mt-8 bg-white text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-purple-400 hover:text-white transition-all'>
              Download Full Report
            </button>
          </motion.section>
        </div>

        {/* Transactions Table Section */}
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
            {transactions.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className='group bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-purple-200 transition-all shadow-sm'
              >
                <div className='flex items-center gap-5'>
                  <div className='w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-50 transition-colors'>
                    <CheckCircle2
                      className={
                        tx.status === "Paid"
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
                      {tx.client}
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

                  <div className='text-right min-w-[120px]'>
                    <p className='text-2xl font-black text-slate-900 tracking-tighter'>
                      {tx.amount}
                    </p>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        tx.status === "Paid"
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
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default VendorEarnings;
