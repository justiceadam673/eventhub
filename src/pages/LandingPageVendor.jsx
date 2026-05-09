import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Users,
  Star,
  ShieldCheck,
  ArrowRight,
  Globe,
  TrendingUp,
  MapPin,
  Briefcase,
  Play,
} from "lucide-react";

const LandingPageVendor = () => {
  const vendors = [
    {
      id: 1,
      name: "Elite Catering",
      category: "Catering",
      location: "Abuja",
      rating: "4.9",
      jobs: "120+",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 2,
      name: "Flash Photo",
      category: "Photography",
      location: "Lagos",
      rating: "4.8",
      jobs: "95+",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 3,
      name: "Royal Decor",
      category: "Decoration",
      location: "PH City",
      rating: "4.7",
      jobs: "80+",
      image:
        "https://images.unsplash.com/photo-1478146896981-b80fe463b33e?auto=format&fit=crop&q=80&w=200",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className='min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-600'>
      {/* Hero Section */}
      <section className='relative px-6 lg:px-12 pt-20 pb-32 overflow-hidden'>
        {/* Decorative Background Elements */}
        <div className='absolute top-20 right-[-10%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[120px] -z-10' />
        <div className='absolute bottom-0 left-[-5%] w-[300px] h-[300px] bg-blue-100/40 rounded-full blur-[100px] -z-10' />

        <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center'>
          {/* Left Content */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={containerVariants}
          >
            <motion.span
              variants={itemVariants}
              className='inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm text-xs font-black uppercase tracking-widest text-purple-600'
            >
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-purple-500'></span>
              </span>
              Now Live in Nigeria
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className='text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter mt-8'
            >
              Your Business, <br />
              <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 italic'>
                Amplified.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className='text-slate-500 text-xl font-medium leading-relaxed mt-8 max-w-lg'
            >
              Join the elite circle of event professionals. Get booked by
              premium clients for weddings, corporate galas, and festivals.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className='flex flex-wrap gap-5 mt-12'
            >
              <button className='group bg-purple-600 hover:bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.15em] transition-all flex items-center gap-3 shadow-2xl shadow-purple-200'>
                Start Earning Now
                <ArrowRight
                  className='group-hover:translate-x-2 transition-transform'
                  size={20}
                />
              </button>
              <button className='flex items-center gap-4 px-8 py-5 font-black text-sm uppercase tracking-widest hover:text-purple-600 transition-colors'>
                <div className='w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center'>
                  <Play size={16} fill='currentColor' />
                </div>
                Watch Demo
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className='grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-slate-200'
            >
              <div>
                <h3 className='text-3xl font-black'>₦250M+</h3>
                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1'>
                  Paid to Vendors
                </p>
              </div>
              <div>
                <h3 className='text-3xl font-black'>15K+</h3>
                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1'>
                  Events Planned
                </p>
              </div>
              <div>
                <h3 className='text-3xl font-black'>4.9/5</h3>
                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1'>
                  Client Rating
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            {/* Main Showcase Card */}
            <div className='bg-white rounded-[3rem] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.07)] border border-slate-50'>
              <div className='flex items-center justify-between mb-10'>
                <div>
                  <h2 className='text-2xl font-black tracking-tight'>
                    Active Proposals
                  </h2>
                  <p className='text-slate-400 font-bold text-xs'>
                    Real-time booking requests
                  </p>
                </div>
                <div className='bg-purple-50 p-4 rounded-2xl text-purple-600'>
                  <TrendingUp size={24} />
                </div>
              </div>

              <div className='space-y-4'>
                {vendors.map((vendor, i) => (
                  <motion.div
                    key={vendor.id}
                    whileHover={{ x: 10 }}
                    className='group bg-slate-50 hover:bg-purple-600 p-4 rounded-[2rem] flex items-center gap-4 transition-all cursor-pointer'
                  >
                    <img
                      src={vendor.image}
                      className='w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all'
                    />
                    <div className='flex-1'>
                      <div className='flex items-center justify-between'>
                        <h4 className='font-black text-sm group-hover:text-white transition-colors'>
                          {vendor.name}
                        </h4>
                        <span className='text-[10px] font-black text-purple-600 group-hover:text-white flex items-center gap-1'>
                          <Star size={10} fill='currentColor' /> {vendor.rating}
                        </span>
                      </div>
                      <div className='flex items-center gap-4 mt-1'>
                        <p className='text-[10px] font-black text-slate-400 group-hover:text-purple-200 uppercase tracking-tighter flex items-center gap-1'>
                          <MapPin size={10} /> {vendor.location}
                        </p>
                        <p className='text-[10px] font-black text-slate-400 group-hover:text-purple-200 uppercase tracking-tighter flex items-center gap-1'>
                          <Briefcase size={10} /> {vendor.jobs}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Success Notification Floating */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className='absolute -top-6 -right-6 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl'
              >
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-green-400 rounded-full flex items-center justify-center'>
                    <ShieldCheck size={20} className='text-slate-900' />
                  </div>
                  <div>
                    <p className='text-[10px] font-black text-green-400 uppercase tracking-widest'>
                      New Payout
                    </p>
                    <p className='text-sm font-black'>₦180,000 Transferred</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why EventHub - Bento Grid */}
      <section className='px-6 lg:px-12 py-32 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-20 text-center'>
            <h2 className='text-5xl font-black tracking-tighter'>
              Why Professionals <br /> Choose{" "}
              <span className='text-purple-600 underline decoration-slate-100'>
                EventHub
              </span>
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]'>
            {/* Card 1: Large */}
            <div className='md:col-span-2 md:row-span-2 bg-purple-600 rounded-[3rem] p-10 text-white relative overflow-hidden group'>
              <Globe className='absolute bottom-[-10%] right-[-10%] w-64 h-64 text-white/10 group-hover:rotate-12 transition-transform duration-700' />
              <div className='relative z-10'>
                <div className='bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6'>
                  <Users size={32} />
                </div>
                <h3 className='text-4xl font-black mb-4 leading-tight'>
                  Global Visibility, <br /> Local Impact.
                </h3>
                <p className='text-purple-100 font-medium text-lg leading-relaxed max-w-sm'>
                  We showcase your business to premium organizers across the
                  continent. Get the recognition your craft deserves.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className='bg-slate-50 rounded-[3rem] p-8 border border-slate-100 group hover:border-purple-200 transition-colors'>
              <div className='bg-green-100 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6'>
                <TrendingUp size={24} />
              </div>
              <h4 className='text-xl font-black mb-2 tracking-tight'>
                Smart Invoicing
              </h4>
              <p className='text-slate-500 font-bold text-xs uppercase tracking-widest leading-loose'>
                Automated payments and professional quotes in seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className='bg-slate-900 rounded-[3rem] p-8 text-white relative group overflow-hidden'>
              <div className='bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6'>
                <Star size={24} className='fill-current' />
              </div>
              <h4 className='text-xl font-black mb-2 tracking-tight'>
                Prime Reputation
              </h4>
              <p className='text-slate-400 font-bold text-xs uppercase tracking-widest leading-loose'>
                Build a verified portfolio that attracts high-ticket clients.
              </p>
            </div>

            {/* Card 4: Wide */}
            <div className='md:col-span-2 bg-blue-50 rounded-[3rem] p-8 flex items-center justify-between relative group overflow-hidden border border-blue-100'>
              <div>
                <h4 className='text-2xl font-black mb-2 tracking-tight'>
                  Security First
                </h4>
                <p className='text-slate-500 font-medium max-w-xs'>
                  Escrow-protected payments ensure you get paid for every single
                  minute of your service.
                </p>
              </div>
              <div className='bg-white p-6 rounded-[2rem] shadow-xl text-blue-600 group-hover:scale-110 transition-transform'>
                <ShieldCheck size={48} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageVendor;
