import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Zap,
  Bell,
  ChevronLeft,
  Clock,
  Send,
} from "lucide-react";

const VendorMessages = () => {
  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 overflow-hidden relative'>
      {/* Background Ambient Glows */}
      <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-[120px] -z-10' />
      <div className='absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100/50 rounded-full blur-[120px] -z-10' />

      {/* Navbar Snippet */}
      <nav className='max-w-7xl mx-auto px-6 py-8 flex items-center justify-between relative z-10'>
        <button className='flex items-center gap-2 font-black text-gray-400 hover:text-purple-600 transition-colors'>
          <ChevronLeft size={20} />
          Back to Dashboard
        </button>
        <div className='flex items-center gap-2'>
          <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
          <span className='text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>
            System Online
          </span>
        </div>
      </nav>

      <main className='max-w-4xl mx-auto px-6 pt-12 pb-24 relative z-10 text-center'>
        {/* Animated Icon Hub */}
        <div className='relative inline-block mb-12'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className='absolute inset-0 border-2 border-dashed border-purple-200 rounded-full scale-150'
          />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='w-32 h-32 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.15)] flex items-center justify-center relative z-10 border border-purple-50'
          >
            <MessageSquare
              size={48}
              className='text-purple-600'
              strokeWidth={2.5}
            />

            {/* Notification Badge Floating */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className='absolute -top-2 -right-2 bg-pink-500 text-white p-2 rounded-xl shadow-lg border-4 border-white'
            >
              <Bell size={16} fill='white' />
            </motion.div>
          </motion.div>

          {/* Satellite Icons */}
          {[Zap, ShieldCheck, Sparkles].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, i % 2 === 0 ? -15 : 15, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
              className={`absolute p-3 bg-white rounded-xl shadow-sm border border-gray-50 text-purple-400
                ${i === 0 ? "-left-16 top-0" : i === 1 ? "-right-20 top-10" : "left-20 -bottom-10"}`}
            >
              <Icon size={20} />
            </motion.div>
          ))}
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className='text-5xl md:text-6xl font-black tracking-tighter mb-6'>
            Real-time{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500'>
              Conversations
            </span>
          </h2>
          <p className='text-gray-500 text-lg font-medium max-w-xl mx-auto leading-relaxed mb-10'>
            We're building a seamless way for you to chat with vendors,
            negotiate quotes, and finalize event details instantly.
          </p>
        </motion.div>

        {/* Features Preview Bento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='grid md:grid-cols-3 gap-6 mb-12 text-left'
        >
          {[
            {
              icon: <Clock size={20} />,
              title: "Quick Replies",
              desc: "AI-powered suggestions for faster booking.",
            },
            {
              icon: <Send size={20} />,
              title: "Instant Quotes",
              desc: "Receive and approve invoices inside the chat.",
            },
            {
              icon: <ShieldCheck size={20} />,
              title: "Secure Chat",
              desc: "End-to-end encryption for your event privacy.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className='bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all group'
            >
              <div className='text-purple-600 mb-4 group-hover:scale-110 transition-transform'>
                {feature.icon}
              </div>
              <h4 className='font-black text-sm uppercase tracking-widest mb-2'>
                {feature.title}
              </h4>
              <p className='text-xs text-gray-500 font-bold leading-relaxed'>
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Notify Me CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='max-w-md mx-auto'
        >
          <div className='bg-white p-2 rounded-[2rem] shadow-xl shadow-purple-100/50 flex flex-col sm:row gap-2 border border-purple-50'>
            <input
              type='email'
              placeholder='Enter your email to get early access'
              className='flex-1 bg-transparent px-6 py-4 outline-none font-bold text-sm'
            />
            <button className='bg-gray-900 hover:bg-purple-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.15em] transition-all whitespace-nowrap'>
              Notify Me
            </button>
          </div>
          <p className='mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2'>
            <Zap size={12} className='text-yellow-500' fill='currentColor' />
            Launching Summer 2026
          </p>
        </motion.div>
      </main>

      {/* Decorative "Message Bubbles" in background */}
      <div className='hidden lg:block'>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className='absolute top-1/3 left-20 w-48 h-12 bg-white rounded-full shadow-lg border border-gray-100'
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, delay: 1 }}
          className='absolute top-1/2 right-20 w-32 h-12 bg-purple-600 rounded-full shadow-xl shadow-purple-200'
        />
      </div>
    </div>
  );
};

export default VendorMessages;
