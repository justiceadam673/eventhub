import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  User,
  Briefcase,
  Mail,
  Lock,
  Phone,
  ChevronRight,
  Store,
  Tag,
} from "lucide-react";
import Signin from "./Signin";

const Signup = () => {
  const [role, setRole] = useState("buyer");

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#fafafa] px-4 py-20 relative overflow-hidden'>
      {/* Decorative background blobs */}
      <div className='absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/40 blur-[100px] -z-10' />
      <div className='absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-pink-100/40 blur-[100px] -z-10' />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-lg'
      >
        <div className='bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(147,51,234,0.08)] border border-purple-50'>
          {/* Logo & Header */}
          <div className='text-center mb-10'>
            <motion.div
              whileHover={{ rotate: 15 }}
              className='inline-block bg-purple-600 p-3 rounded-2xl mb-4 shadow-lg shadow-purple-200'
            >
              <Sparkles size={28} className='text-white' />
            </motion.div>
            <h1 className='text-3xl font-black text-gray-900 tracking-tight'>
              Join <span className='text-purple-600'>EventHub</span>
            </h1>
            <p className='text-gray-500 mt-2 font-medium'>
              Start your journey with us today
            </p>
          </div>

          {/* Role Selection - Delightful Toggle */}
          <div className='flex bg-gray-100/80 p-1.5 rounded-2xl mb-8 relative'>
            <motion.div
              layout
              className='absolute h-[calc(100%-12px)] top-[6px] rounded-xl bg-white shadow-sm transition-all'
              style={{
                width: "calc(50% - 6px)",
                left: role === "buyer" ? "6px" : "calc(50% + 0px)",
              }}
            />
            <button
              onClick={() => setRole("buyer")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 z-10 text-sm font-bold transition-colors ${
                role === "buyer" ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <User size={18} />
              I'm a Buyer
            </button>
            <button
              onClick={() => setRole("vendor")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 z-10 text-sm font-bold transition-colors ${
                role === "vendor" ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <Briefcase size={18} />
              I'm a Vendor
            </button>
          </div>

          {/* Form */}
          <form className='space-y-5'>
            {/* Full Name */}
            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>
                Full Name
              </label>
              <div className='relative group'>
                <User
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                  size={18}
                />
                <input
                  type='text'
                  placeholder='John Doe'
                  className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-medium text-gray-700'
                />
              </div>
            </div>

            {/* Vendor-Specific Fields with Animation */}
            <AnimatePresence mode='wait'>
              {role === "vendor" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className='overflow-hidden space-y-5'
                >
                  <div className='space-y-1.5'>
                    <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>
                      Business Name
                    </label>
                    <div className='relative group'>
                      <Store
                        className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                        size={18}
                      />
                      <input
                        type='text'
                        placeholder='Elite Catering'
                        className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-medium text-gray-700'
                      />
                    </div>
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>
                      Category
                    </label>
                    <div className='relative group'>
                      <Tag
                        className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                        size={18}
                      />
                      <select className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-medium text-gray-700 appearance-none'>
                        <option>Select Category</option>
                        <option>Catering</option>
                        <option>Photography</option>
                        <option>Decoration</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>
                Email
              </label>
              <div className='relative group'>
                <Mail
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                  size={18}
                />
                <input
                  type='email'
                  placeholder='name@example.com'
                  className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-medium text-gray-700'
                />
              </div>
            </div>

            {/* Password */}
            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>
                Password
              </label>
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

            {/* Create Button */}
            <Link to={"/dashboard"}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-purple-100 flex items-center justify-center gap-2 mt-8'
              >
                Create Account
                <ChevronRight size={20} />
              </motion.button>
            </Link>
          </form>

          {/* Footer Links */}
          <div className='mt-10 text-center'>
            <p className='text-gray-500 font-medium'>
              Already have an account?{" "}
              <Link
                to='/signin'
                className='text-purple-600 font-bold hover:underline underline-offset-4'
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
