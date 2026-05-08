import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Compass,
  Store,
  Info,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-purple-50'>
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='flex items-center gap-2 cursor-pointer group'
        >
          <div className='bg-purple-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300'>
            <Sparkles size={20} className='text-white' />
          </div>
          <h1 className='text-2xl font-black tracking-tight text-gray-900'>
            Event<span className='text-purple-600'>Hub</span>
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          {[
            { name: "Explore", icon: <Compass size={18} /> },
            { name: "Vendors", icon: <Store size={18} /> },
            { name: "How it Works", icon: <Info size={18} /> },
          ].map((item) => (
            <motion.a
              key={item.name}
              href='#'
              whileHover={{ y: -2 }}
              className='flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors'
            >
              {item.icon}
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='hidden md:flex items-center gap-3'>
          <Link to='/signin'>
            <button className='px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-full transition-all'>
              Login
            </button>
          </Link>
          <Link to='/signup'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple-200 transition-all'
            >
              Get Started
              <ChevronRight size={16} />
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='p-2 text-gray-600'
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden bg-white border-t border-gray-100 overflow-hidden'
          >
            <div className='flex flex-col p-6 gap-4'>
              <a href='#' className='text-lg font-medium text-gray-800'>
                Explore
              </a>
              <a href='#' className='text-lg font-medium text-gray-800'>
                Vendors
              </a>
              <a href='#' className='text-lg font-medium text-gray-800'>
                How it Works
              </a>
              <hr className='border-gray-100' />
              <Link
                to='/signin'
                className='w-full py-3 text-purple-600 font-bold'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='w-full bg-purple-600 text-white py-3 rounded-xl font-bold'
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
