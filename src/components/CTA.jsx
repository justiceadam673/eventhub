import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Fixed: Added curly braces to correct the import
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const CTA = () => {
  return (
    <section className='py-24 px-6 relative overflow-hidden'>
      {/* The Container - Bento Style */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className='max-w-6xl mx-auto relative rounded-[3rem] overflow-hidden bg-gray-900 shadow-2xl shadow-purple-200'
      >
        {/* Animated Background Gradients */}
        <div className='absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-600/20 to-transparent pointer-events-none' />
        <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full' />

        <div className='relative z-10 px-8 py-16 md:py-24 text-center flex flex-col items-center'>
          {/* Top Icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className='mb-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20'
          >
            <Sparkles size={32} className='text-purple-400' />
          </motion.div>

          <h2 className='text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight'>
            Ready to Plan Your <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300'>
              Perfect Event?
            </span>
          </h2>

          <p className='text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed'>
            Join thousands of happy planners and find the vendors you need to
            make your celebration truly unforgettable. No stress, just magic.
          </p>

          {/* Value Props */}
          <div className='flex flex-wrap justify-center gap-6 mb-12'>
            {["Free to use", "Verified vendors", "Instant booking"].map(
              (text) => (
                <div
                  key={text}
                  className='flex items-center gap-2 text-gray-300 text-sm font-medium'
                >
                  <CheckCircle2 size={16} className='text-purple-500' />
                  {text}
                </div>
              )
            )}
          </div>

          {/* Primary Action */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <Link to='/signup'>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgb(147 51 234 / 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className='bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 transition-all w-full sm:w-auto'
              >
                Get Started for Free
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            {/* Now navigates smoothly to the signup page with exact same styling */}
            {/* <Link to='/signup'>
              <button className='px-10 py-5 text-white font-bold hover:bg-white/5 rounded-full transition-all w-full sm:w-auto'>
                Talk to Sales
              </button>
            </Link> */}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
