import { motion } from "framer-motion";
import { Search, MapPin, LayoutGrid, ArrowRight, Star } from "lucide-react";
import heroImage from "../assets/img/eventhub-bg.avif";
import { Link } from "react-router-dom";

const Hero = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className='relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden'>
      <div className='absolute inset-0 z-10'>
        <img
          src={heroImage}
          alt='Event planning hero'
          className='w-full h-full object-cover object-center'
        />
      </div>
      <div className='absolute inset-0 bg-black/40 z-11' />

      {/* Abstract Background Elements for "Sweetness" */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-16'>
        <div className='absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-100/50 blur-[120px]' />
        <div className='absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-pink-100/50 blur-[100px]' />
      </div>

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='max-w-5xl mx-auto px-6 text-center relative z-16'
      >
        {/* Floating Badge */}
        <motion.div
          variants={itemVariants}
          className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50/90 border border-purple-100 text-purple-600 text-sm font-semibold mb-6 shadow-sm'
        >
          <Star size={14} className='fill-purple-600' />
          <span>Trust by 2,000+ Event Planners</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className='text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]'
        >
          Find the Perfect{" "}
          <span className='text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400'>
            Vendors
          </span>{" "}
          <br />
          for Your Big Day
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className='text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed'
        >
          Discover, compare, and book top-rated vendors seamlessly. From
          catering to decor, we bring your vision to life.
        </motion.p>

        {/* Search Bar - The "Serious" Tool */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className='bg-white p-2 md:p-3 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-2 max-w-4xl mx-auto shadow-[0_20px_50px_rgba(147,51,234,0.1)] border border-purple-50'
        >
          <div className='flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100'>
            <LayoutGrid className='text-purple-500' size={20} />
            <select className='bg-transparent w-full focus:outline-none text-gray-700 font-medium appearance-none cursor-pointer'>
              <option>Select Category</option>
              <option>Catering</option>
              <option>Photography</option>
              <option>Decoration</option>
            </select>
          </div>

          <div className='flex-1 flex items-center gap-3 px-4 py-3'>
            <MapPin className='text-purple-500' size={20} />
            <input
              type='text'
              placeholder='Where is your event?'
              className='bg-transparent w-full focus:outline-none text-gray-700 font-medium'
            />
          </div>

          <Link to='/signup'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-200'
            >
              <Search size={18} />
              Search Now
            </motion.button>
          </Link>
        </motion.div>

        {/* Secondary CTAs */}
        <motion.div
          variants={itemVariants}
          className='mt-10 flex flex-wrap items-center justify-center gap-6'
        >
          <button className='group flex items-center gap-2 text-white font-bold hover:text-purple-600 transition-colors'>
            Explore All Vendors
            <ArrowRight
              size={18}
              className='group-hover:translate-x-1 transition-transform'
            />
          </button>
          <div className='h-1 w-1 rounded-full bg-pink-500 hidden sm:block' />
          <button className='text-purple-100 font-medium hover:underline decoration-purple-300 underline-offset-4'>
            Are you a vendor? Join us
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
