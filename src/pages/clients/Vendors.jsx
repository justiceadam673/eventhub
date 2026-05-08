import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  Heart,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

const ExploreVendors = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedVendors, setSavedVendors] = useState([]);

  const categories = [
    "All",
    "Catering",
    "Photography",
    "Decoration",
    "DJ",
    "Makeup",
  ];

  const vendors = [
    {
      id: 1,
      name: "Elite Catering",
      category: "Catering",
      location: "Abuja",
      rating: "4.9",
      reviews: 128,
      price: "₦250,000",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      name: "Flash Photography",
      category: "Photography",
      location: "Lagos",
      rating: "4.8",
      reviews: 94,
      price: "₦180,000",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      name: "Royal Decorations",
      category: "Decoration",
      location: "Jos",
      rating: "4.7",
      reviews: 56,
      price: "₦300,000",
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      name: "DJ Vibes",
      category: "DJ",
      location: "Abuja",
      rating: "4.9",
      reviews: 210,
      price: "₦120,000",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 5,
      name: "Glow Beauty Studio",
      category: "Makeup",
      location: "Lagos",
      rating: "4.6",
      reviews: 42,
      price: "₦85,000",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=800",
    },
  ];

  // Combined Search and Filter Logic
  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesCategory =
        selectedCategory === "All" || vendor.category === selectedCategory;
      const matchesSearch =
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleSave = (id) => {
    setSavedVendors((prev) =>
      prev.includes(id) ? prev.filter((vId) => vId !== id) : [...prev, id]
    );
  };

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20'>
      {/* Decorative Background */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-100/50 to-transparent blur-[100px] pointer-events-none -z-10' />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
        {/* Page Header */}
        <div className='text-center max-w-2xl mx-auto mb-12'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6 text-sm font-bold text-purple-600'
          >
            <Sparkles size={16} />
            Discover the best local talent
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-4xl md:text-5xl font-black tracking-tight mb-4'
          >
            Find Your Perfect{" "}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500'>
              Vendors
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-lg text-gray-500 font-medium'
          >
            Browse top-rated professionals to make your event unforgettable.
          </motion.p>
        </div>

        {/* Sticky Control Bar (Search + Filters) */}
        <div className='sticky top-4 z-30 mb-10'>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white flex flex-col xl:flex-row items-center gap-4'
          >
            {/* Search Input */}
            <div className='relative w-full xl:w-fit flex-shrink-0 group'>
              <Search
                className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                size={20}
              />
              <input
                type='text'
                placeholder='Search by name or location (e.g. Abuja)...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-full py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-sm font-medium placeholder:text-gray-400'
              />
            </div>

            <div className='hidden xl:block w-[1px] h-8 bg-gray-200 mx-2' />

            {/* Category Pills */}
            <div className='flex items-center gap-2 overflow-x-auto w-full pb-2 xl:pb-0 scrollbar-hide'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white shadow-md shadow-gray-200"
                      : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {category}
                </button>
              ))}

              <button className='ml-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 text-sm font-bold transition-colors'>
                <SlidersHorizontal size={16} />
                More Filters
              </button>
            </div>
          </motion.div>
        </div>

        {/* Vendors Grid */}
        <motion.section
          layout
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          <AnimatePresence mode='popLayout'>
            {filteredVendors.map((vendor) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={vendor.id}
                className='group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-100/40 border border-gray-100 transition-all duration-500 flex flex-col h-full'
              >
                {/* Image & Overlays */}
                <div className='relative h-60 overflow-hidden cursor-pointer'>
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                  />

                  {/* Category Badge */}
                  <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm text-gray-900 uppercase'>
                    {vendor.category}
                  </div>

                  {/* Save Heart Button */}
                  <button
                    onClick={() => toggleSave(vendor.id)}
                    className='absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-pink-500 hover:scale-110 transition-all shadow-sm z-10'
                  >
                    <Heart
                      size={18}
                      className={`transition-colors ${savedVendors.includes(vendor.id) ? "fill-pink-500 text-pink-500" : "hover:fill-pink-500"}`}
                    />
                  </button>

                  {/* Rating Gradient */}
                  <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none' />
                  <div className='absolute bottom-4 left-4 flex items-center gap-2'>
                    <div className='flex items-center gap-1 bg-white text-gray-900 px-2 py-1 rounded-lg text-sm font-bold shadow-sm'>
                      <Star
                        size={14}
                        className='fill-yellow-400 text-yellow-400'
                      />
                      {vendor.rating}
                    </div>
                    <span className='text-white text-xs font-medium drop-shadow-md'>
                      ({vendor.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className='p-6 flex flex-col flex-1'>
                  <h3 className='text-2xl font-black text-gray-900 mb-2 group-hover:text-purple-600 transition-colors cursor-pointer'>
                    {vendor.name}
                  </h3>

                  <div className='flex items-center gap-1.5 text-gray-500 text-sm font-medium mb-6'>
                    <MapPin size={16} className='text-gray-400' />
                    {vendor.location}
                  </div>

                  {/* Footer (Price & CTA) */}
                  <div className='mt-auto pt-6 border-t border-gray-100 flex items-center justify-between'>
                    <div>
                      <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1'>
                        Starting From
                      </p>
                      <h4 className='text-xl font-black text-gray-900'>
                        {vendor.price}
                      </h4>
                    </div>

                    <button className='bg-gray-900 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5'>
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {/* Empty State / No Results */}
        {filteredVendors.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex flex-col items-center justify-center py-20 text-center'
          >
            <div className='w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6'>
              <Search size={40} className='text-gray-300' />
            </div>
            <h3 className='text-2xl font-black text-gray-900 mb-2'>
              No vendors found
            </h3>
            <p className='text-gray-500 font-medium max-w-sm'>
              We couldn't find any vendors matching "{searchQuery}" in the{" "}
              {selectedCategory} category. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className='mt-6 text-purple-600 font-bold hover:underline underline-offset-4'
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ExploreVendors;
