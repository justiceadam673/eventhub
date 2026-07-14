import React from "react";
import { motion } from "framer-motion";
import { Utensils, Camera, PartyPopper, Music, ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Catering",
    icon: <Utensils size={32} />,
    color: "bg-orange-50 text-orange-600",
    border: "border-orange-100",
  },
  {
    name: "Photography",
    icon: <Camera size={32} />,
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    name: "Decoration",
    icon: <PartyPopper size={32} />,
    color: "bg-pink-50 text-pink-600",
    border: "border-pink-100",
  },
  {
    name: "DJ & Music",
    icon: <Music size={32} />,
    color: "bg-purple-50 text-purple-600",
    border: "border-purple-100",
  },
];

const Categories = () => {
  return (
    <section className='py-24 px-6 max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-4'>
        <div className='text-left'>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className='text-purple-600 font-bold tracking-widest uppercase text-sm'
          >
            Categories
          </motion.span>
          <h2 className='text-4xl font-black text-gray-900 mt-2'>
            What are you <span className='text-purple-600'>looking for?</span>
          </h2>
        </div>

        {/* <button className='flex items-center gap-2 text-gray-500 font-semibold hover:text-purple-600 transition-colors group'>
          View all categories
          <ArrowRight
            size={20}
            className='group-hover:translate-x-1 transition-transform'
          />
        </button> */}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              transition: { duration: 0.2 },
            }}
            className={`group relative p-8 rounded-3xl bg-white border ${cat.border} cursor-pointer shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300`}
          >
            {/* Decorative Background Blob */}
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${cat.color} opacity-10 rounded-bl-[80px] -z-0 transition-all group-hover:w-full group-hover:h-full group-hover:rounded-3xl`}
            />

            <div className='relative z-10'>
              <div
                className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.icon}
              </div>

              <h3 className='text-xl font-bold text-gray-800 mb-2'>
                {cat.name}
              </h3>
              <p className='text-gray-500 text-sm leading-relaxed'>
                Find the best professionals to make your{" "}
                {cat.name.toLowerCase()} unforgettable.
              </p>

              <div className='mt-6 flex items-center gap-2 text-purple-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity'>
                Explore Vendors <ArrowRight size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
