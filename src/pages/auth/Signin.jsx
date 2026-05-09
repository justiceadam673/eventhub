import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Mail, Lock, LogIn, Fingerprint } from "lucide-react";

const Signin = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#fafafa] px-4 relative overflow-hidden'>
      {/* Soft Background Accents */}
      <div className='absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/30 blur-[120px] rounded-full -z-10' />
      <div className='absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-100/20 blur-[120px] rounded-full -z-10' />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full max-w-md'
      >
        <div className='bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.06)] border border-white'>
          {/* Logo & Greeting */}
          <div className='text-center mb-10'>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              className='inline-flex bg-gradient-to-tr from-purple-600 to-pink-500 p-3.5 rounded-2xl mb-5 shadow-lg shadow-purple-200'
            >
              <Sparkles size={28} className='text-white' />
            </motion.div>
            <h1 className='text-3xl font-black text-gray-900 tracking-tight'>
              Welcome <span className='text-purple-600'>Back</span>
            </h1>
            <p className='text-gray-500 mt-2 font-medium flex items-center justify-center gap-1'>
              Nice to see you again <span className='animate-bounce'>👋</span>
            </p>
          </div>

          {/* Form */}
          <form className='space-y-6'>
            {/* Email Field */}
            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>
                Email Address
              </label>
              <div className='relative group'>
                <Mail
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                  size={18}
                />
                <input
                  type='email'
                  placeholder='hello@example.com'
                  className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-medium text-gray-700'
                />
              </div>
            </div>

            {/* Password Field */}
            <div className='space-y-1.5'>
              <div className='flex justify-between items-center px-1'>
                <label className='text-xs font-bold text-gray-400 uppercase tracking-widest'>
                  Password
                </label>
                <button
                  type='button'
                  className='text-xs font-bold text-purple-600 hover:text-purple-700'
                >
                  Forgot?
                </button>
              </div>
              <div className='relative group'>
                <Lock
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                  size={18}
                />
                <input
                  type='password'
                  placeholder='••••••••'
                  className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-medium text-gray-700'
                />
              </div>
            </div>

            {/* Options */}
            <div className='flex items-center justify-between px-1'>
              <label className='flex items-center gap-3 cursor-pointer group'>
                <div className='relative'>
                  <input type='checkbox' className='peer sr-only' />
                  <div className='w-5 h-5 border-2 border-gray-200 rounded-md peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all' />
                  <Fingerprint
                    size={12}
                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 transition-opacity'
                  />
                </div>
                <span className='text-sm font-semibold text-gray-500 group-hover:text-gray-700 transition-colors'>
                  Keep me signed in
                </span>
              </label>
            </div>

            {/* Sign In Button */}
            <Link to={"/dashboard"}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-gray-900 hover:bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 hover:shadow-purple-200 flex items-center justify-center gap-3 transition-all mt-8'
              >
                Sign In
                <LogIn size={20} />
              </motion.button>
            </Link>
          </form>

          {/* Social Sign In (Extra Touch) */}
          <div className='mt-8 flex flex-col items-center gap-6'>
            <div className='flex items-center gap-4 w-full'>
              <div className='h-[1px] bg-gray-100 flex-1' />
              <span className='text-xs font-bold text-gray-300 uppercase tracking-tighter'>
                or secure login
              </span>
              <div className='h-[1px] bg-gray-100 flex-1' />
            </div>

            <p className='text-gray-500 font-medium'>
              New to EventHub?{" "}
              <Link
                to='/signup'
                className='text-purple-600 font-bold hover:underline underline-offset-4'
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Support Link */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-8'
        >
          <a
            href='#'
            className='text-sm font-medium text-gray-400 hover:text-purple-600 flex items-center justify-center gap-2'
          >
            Need help accessing your account? <ArrowRight size={14} />
          </a>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default Signin;
