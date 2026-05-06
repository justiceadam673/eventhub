import React from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, ArrowUpRight, ShieldCheck } from "lucide-react";

const VendorCard = ({ vendor }) => {
  // Mock data fallback if props are missing
  const {
    name = "Elite Catering Services",
    category = "Catering",
    rating = "4.9",
    reviews = "120",
    price = "$$$",
    location = "New York, NY",
    image = "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=500",
  } = vendor || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className='group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-500'
    >
      {/* Image Container */}
      <div className='relative h-64 overflow-hidden'>
        <motion.img
          src={image}
          alt={name}
          className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
        />

        {/* Top Overlay Actions */}
        <div className='absolute top-4 left-4 right-4 flex justify-between items-start'>
          <div className='flex flex-col gap-2'>
            <span className='bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1'>
              <ShieldCheck size={12} className='text-purple-600' />
              Verified
            </span>
          </div>
          <button className='p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-pink-500 hover:scale-110 transition-all shadow-sm'>
            <Heart
              size={18}
              fill='currentColor'
              className='text-transparent hover:text-pink-500'
            />
          </button>
        </div>

        {/* Bottom Image Gradient Overlay */}
        <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent' />

        <div className='absolute bottom-4 left-4 flex items-center gap-2 text-white'>
          <div className='flex items-center gap-1 bg-purple-600 px-2 py-1 rounded-lg text-xs font-bold'>
            <Star size={12} className='fill-white' />
            {rating}
          </div>
          <span className='text-xs font-medium text-gray-200'>
            ({reviews} reviews)
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className='p-6'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <span className='text-purple-600 text-xs font-bold uppercase tracking-wider'>
              {category}
            </span>
            <h3 className='text-xl font-bold text-gray-900 mt-1 group-hover:text-purple-600 transition-colors'>
              {name}
            </h3>
          </div>
          <span className='text-gray-900 font-bold'>{price}</span>
        </div>

        <div className='flex items-center gap-1 text-gray-500 text-sm mb-6'>
          <MapPin size={14} />
          {location}
        </div>

        <div className='flex items-center gap-2'>
          <motion.button
            whileHover={{ flex: 2 }}
            className='flex-1 bg-gray-900 text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all'
          >
            View Profile
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className='p-3 bg-purple-50 text-purple-600 rounded-2xl hover:bg-purple-600 hover:text-white transition-colors'
          >
            <ArrowUpRight size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VendorCard;
