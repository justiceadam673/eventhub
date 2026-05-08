import { Outlet } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Compass,
  CalendarHeart,
  MessageSquare,
  User,
  LogOut,
  Zap,
  Menu,
  X,
} from "lucide-react";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      id: "/dashboard",
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "/vendors",
      name: "Explore Vendors",
      icon: <Compass size={20} />,
    },
    {
      id: "/bookings",
      name: "My Bookings",
      icon: <CalendarHeart size={20} />,
    },
    {
      id: "/messages",
      name: "Messages",
      icon: <MessageSquare size={20} />,
    },
    { id: "/profile", name: "Profile", icon: <User size={20} /> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Desktop Sidebar */}
      <aside className='hidden lg:flex w-[25%] h-screen bg-white border-r fixed top-0 left-0 border-gray-200 flex-col p-8 overflow-y-auto'>
        {/* Logo */}
        <motion.div
          className='flex items-center gap-3 mb-10 px-2 cursor-pointer'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className='bg-purple-600 p-2.5 rounded-xl shadow-md shadow-purple-200'>
            <Zap size={22} className='text-white' />
          </div>
          <h1 className='text-2xl font-black text-gray-900 tracking-tight'>
            Event<span className='text-purple-600'>Hub</span>
          </h1>
        </motion.div>

        {/* Navigation */}
        <nav className='flex flex-col gap-3 flex-1'>
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
                location.pathname === item.id
                  ? "bg-purple-100 text-purple-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.icon}
              <span>{item.name}</span>
            </motion.button>
          ))}
        </nav>

        {/* Logout */}
        <motion.div
          className='pt-6 border-t border-gray-200'
          whileHover={{ scale: 1.02 }}
        >
          <Link
            to='/'
            className='flex items-center cursor-pointer gap-4 text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-all w-full font-medium text-sm'
          >
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </motion.div>
      </aside>

      {/* Mobile Hamburger Button */}
      <motion.button
        className='lg:hidden fixed top-6 left-6 z-50 bg-white p-2.5 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode='wait'>
          {isMenuOpen ? (
            <motion.div
              key='close'
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className='text-purple-600' />
            </motion.div>
          ) : (
            <motion.div
              key='menu'
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} className='text-gray-700' />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className='lg:hidden fixed inset-0 z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              className='absolute inset-0 bg-black/30'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Dropdown Content */}
            <motion.div
              className='absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Logo in Dropdown */}
              <div className='bg-linear-to-r from-purple-50 to-purple-100 p-6 flex items-center gap-3 border-b border-gray-200'>
                <div className='bg-purple-600 p-2 rounded-lg shadow-md shadow-purple-200'>
                  <Zap size={20} className='text-white' />
                </div>
                <h1 className='text-xl font-black text-gray-900'>
                  Event<span className='text-purple-600'>Hub</span>
                </h1>
              </div>

              {/* Navigation Items */}
              <nav className='flex flex-col py-4'>
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`flex items-center gap-4 px-6 py-4 transition-all font-medium text-sm ${
                      location.pathname === item.id
                        ? "bg-purple-100 text-purple-700 border-l-4 border-purple-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Logout Button */}
              <motion.div
                className='border-t border-gray-200 p-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <Link
                  to='/'
                  className='flex items-center cursor-pointer gap-4 text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg transition-all w-full font-medium text-sm'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className='w-full lg:w-[70%] lg:ml-[25%]'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
