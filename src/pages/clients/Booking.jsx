import { motion } from "framer-motion";
import {
  Calendar,
  Users,
  MapPin,
  ShieldCheck,
  Sparkles,
  Info,
  CreditCard,
  MessageCircle,
  Star,
} from "lucide-react";

const BookingPage = () => {
  const vendor = {
    name: "Elite Catering",
    category: "Gourmet Catering",
    rating: "4.9",
    reviews: "128",
    location: "Abuja, Nigeria",
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1000",
    price: 250000,
  };

  const platformFee = 10000;
  const total = vendor.price + platformFee;

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900'>
      <main className='max-w-7xl mx-auto p-6 lg:p-10 grid lg:grid-cols-3 gap-10'>
        {/* Left Column: Form & Info */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Hero Vendor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100'
          >
            <div className='relative h-80'>
              <img
                src={vendor.image}
                alt={vendor.name}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent' />
              <div className='absolute bottom-6 left-8 text-white'>
                <div className='flex items-center gap-2 mb-2'>
                  <span className='bg-purple-600 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full'>
                    Top Rated
                  </span>
                </div>
                <h2 className='text-4xl font-black'>{vendor.name}</h2>
                <div className='flex items-center gap-4 mt-2 text-gray-200 font-medium'>
                  <div className='flex items-center gap-1'>
                    <Star
                      size={16}
                      className='fill-yellow-400 text-yellow-400'
                    />
                    <span>
                      {vendor.rating} ({vendor.reviews} reviews)
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <MapPin size={16} />
                    <span>{vendor.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100'
          >
            <div className='flex items-center gap-3 mb-8'>
              <div className='bg-purple-100 p-2 rounded-xl'>
                <Sparkles size={24} className='text-purple-600' />
              </div>
              <h3 className='text-2xl font-black'>Booking Details</h3>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
              {/* Event Type */}
              <div className='space-y-2'>
                <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                  Event Type
                </label>
                <select className='w-full bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-bold text-gray-700 appearance-none'>
                  <option>Wedding Ceremony</option>
                  <option>Corporate Gala</option>
                  <option>Birthday Celebration</option>
                  <option>Private Concert</option>
                </select>
              </div>

              {/* Date */}
              <div className='space-y-2'>
                <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                  Preferred Date
                </label>
                <div className='relative'>
                  <Calendar
                    className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    type='date'
                    className='w-full bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-bold text-gray-700'
                  />
                </div>
              </div>

              {/* Guests */}
              <div className='space-y-2 md:col-span-2'>
                <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                  Estimated Guest Count
                </label>
                <div className='relative'>
                  <Users
                    className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-400'
                    size={18}
                  />
                  <input
                    type='number'
                    placeholder='e.g. 150'
                    className='w-full bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-bold text-gray-700'
                  />
                </div>
              </div>

              {/* Venue */}
              <div className='space-y-2 md:col-span-2'>
                <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                  Venue Address
                </label>
                <textarea
                  rows='3'
                  placeholder='Enter full event location...'
                  className='w-full bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-bold text-gray-700 resize-none'
                ></textarea>
              </div>

              {/* Notes */}
              <div className='space-y-2 md:col-span-2'>
                <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                  Special Requirements
                </label>
                <textarea
                  rows='3'
                  placeholder='Dietary restrictions, theme details, etc...'
                  className='w-full bg-gray-50 border-none rounded-2xl px-5 py-4 outline-none ring-2 ring-transparent focus:ring-purple-600/20 focus:bg-white transition-all font-bold text-gray-700 resize-none'
                ></textarea>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Sticky Summary */}
        <div className='relative'>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className='sticky top-28 bg-white rounded-[2.5rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden'
          >
            {/* Design Decoration */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 z-0' />

            <h3 className='text-xl font-black mb-8 relative z-10'>
              Order Summary
            </h3>

            {/* Compact Vendor Info */}
            <div className='flex items-center gap-4 mb-8 p-3 bg-gray-50 rounded-2xl'>
              <img
                src={vendor.image}
                alt={vendor.name}
                className='w-16 h-16 rounded-xl object-cover'
              />
              <div>
                <h4 className='font-bold text-gray-900 leading-tight'>
                  {vendor.name}
                </h4>
                <p className='text-xs text-gray-500 font-medium'>
                  {vendor.category}
                </p>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className='space-y-4 mb-8'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-500 font-semibold flex items-center gap-2'>
                  Service Quote <Info size={14} className='text-gray-300' />
                </span>
                <span className='font-bold'>
                  ₦{vendor.price.toLocaleString()}
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-500 font-semibold'>
                  Platform Fee
                </span>
                <span className='font-bold'>
                  ₦{platformFee.toLocaleString()}
                </span>
              </div>
              <div className='h-px bg-gray-100 my-2' />
              <div className='flex justify-between items-center text-xl'>
                <span className='font-black'>Total</span>
                <span className='font-black text-purple-600'>
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className='space-y-3'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full bg-gray-900 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-gray-200 hover:bg-purple-600 hover:shadow-purple-200 transition-all'
              >
                <CreditCard size={20} />
                Secure Checkout
              </motion.button>

              <button className='w-full bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-gray-50 transition-all'>
                <MessageCircle size={20} />
                Chat with Vendor
              </button>
            </div>

            {/* Trust Badges */}
            <div className='mt-8 pt-8 border-t border-gray-50 text-center'>
              <div className='flex items-center justify-center gap-2 text-purple-600 mb-2 font-bold text-sm'>
                <ShieldCheck size={18} />
                <span>Event Protection Enabled</span>
              </div>
              <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed px-4'>
                Your payment is held in escrow until the event is completed
                successfully.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
