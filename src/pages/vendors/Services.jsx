import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MoreVertical,
  Star,
  CalendarCheck,
  Trash2,
  Edit3,
  Zap,
  TrendingUp,
  X,
  Sparkles,
  ImageIcon,
  UploadCloud,
} from "lucide-react";

const VendorServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Wedding Catering",
      category: "Catering",
      price: 450000,
      description:
        "Premium catering service for weddings and large events featuring continental and local dishes.",
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
      rating: 4.9,
      bookings: 12,
    },
    {
      id: 2,
      name: "Corporate Gala Menu",
      category: "Corporate",
      price: 800000,
      description:
        "Professional catering service for conferences and corporate events with executive serving staff.",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
      rating: 4.8,
      bookings: 8,
    },
  ]);

  // Modal State & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Catering",
    price: "",
    description: "",
    image: "", // Stores local file URLs or web strings
  });

  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Modern handling for Local File Uploads
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: localUrl });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) return;

    const newService = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      // Uses uploaded image, falls back to raw premium alternative placeholder if empty
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800",
      rating: 5.0,
      bookings: 0,
    };

    setServices([newService, ...services]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      category: "Catering",
      price: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20 relative'>
      <main className='max-w-7xl mx-auto p-6 lg:p-10'>
        {/* Header Section */}
        <header className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className='text-4xl font-black tracking-tight text-gray-900'>
              Service <span className='text-purple-600'>Portfolio</span>
            </h1>
            <p className='text-gray-500 mt-2 font-medium'>
              You have {services.length} active service packages being
              showcased.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className='bg-gray-900 hover:bg-purple-600 text-white px-8 py-4 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all font-black text-sm shadow-xl shadow-gray-200 hover:shadow-purple-200'
          >
            <Plus size={20} strokeWidth={3} />
            Add New Service
          </motion.button>
        </header>

        {/* Services Grid */}
        <motion.div
          layout
          className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
        >
          <AnimatePresence>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className='bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all group'
              >
                {/* Image Section */}
                <div className='relative h-64 overflow-hidden'>
                  <img
                    src={service.image}
                    alt={service.name}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                  {/* Category Badge */}
                  <div className='absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-lg'>
                    {service.category}
                  </div>

                  <button className='absolute top-5 right-5 p-2 bg-white/20 backdrop-blur-md text-white rounded-xl hover:bg-white hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100'>
                    <MoreVertical size={20} />
                  </button>
                </div>

                {/* Content Section */}
                <div className='p-8'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h2 className='text-2xl font-black text-gray-900 group-hover:text-purple-600 transition-colors'>
                        {service.name}
                      </h2>
                      <p className='text-xl font-black text-purple-600 mt-1'>
                        ₦{service.price.toLocaleString()}
                      </p>
                    </div>
                    <div className='bg-green-50 p-2 rounded-xl'>
                      <TrendingUp size={18} className='text-green-600' />
                    </div>
                  </div>

                  <p className='text-gray-500 font-medium text-sm leading-relaxed line-clamp-2 mb-6'>
                    {service.description}
                  </p>

                  {/* Trust Stats */}
                  <div className='grid grid-cols-2 gap-4 py-5 border-t border-gray-50 mb-6'>
                    <div className='flex items-center gap-2'>
                      <div className='p-2 bg-yellow-50 rounded-lg'>
                        <Star
                          size={16}
                          className='fill-yellow-400 text-yellow-400'
                        />
                      </div>
                      <span className='text-xs font-black'>
                        {service.rating} Rating
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='p-2 bg-purple-50 rounded-lg'>
                        <CalendarCheck size={16} className='text-purple-600' />
                      </div>
                      <span className='text-xs font-black'>
                        {service.bookings} Bookings
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className='flex gap-3'>
                    <button className='flex-[3] bg-gray-50 hover:bg-purple-600 hover:text-white text-gray-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2'>
                      <Edit3 size={16} />
                      Edit Service
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
                      className='flex-1 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white py-4 rounded-2xl transition-all flex items-center justify-center'
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {services.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='bg-white rounded-[3rem] p-20 text-center shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-gray-100 max-w-2xl mx-auto mt-10'
            >
              <div className='w-24 h-24 bg-purple-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 relative'>
                <Zap size={40} className='text-purple-600 relative z-10' />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className='absolute inset-0 bg-purple-100 rounded-[2.5rem] -z-0'
                />
              </div>

              <h2 className='text-3xl font-black mb-4'>
                Your Portfolio is Empty
              </h2>
              <p className='text-gray-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed'>
                Start adding your professional event services to get discovered
                by thousands of clients like Justice Adam.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className='bg-purple-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-purple-200 hover:bg-gray-900 transition-all flex items-center gap-3 mx-auto'
              >
                <Plus size={20} />
                Create First Service
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Premium Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6'>
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className='absolute inset-0 bg-gray-900/40 backdrop-blur-md'
            />

            {/* Modal Card Structure */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className='bg-white w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] border border-gray-100 z-10 max-h-[92vh] flex flex-col'
            >
              {/* Modal Banner Top */}
              <div className='bg-gray-950 p-6 text-white relative overflow-hidden flex items-center justify-between shrink-0'>
                <div className='absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl' />
                <div className='flex items-center gap-3 relative z-10'>
                  <div className='w-10 h-10 bg-purple-600/20 rounded-xl flex items-center justify-center border border-purple-500/30'>
                    <Sparkles size={18} className='text-purple-400' />
                  </div>
                  <div>
                    <h3 className='text-lg font-black tracking-tight'>
                      New Service Package
                    </h3>
                    <p className='text-gray-400 text-xs font-medium'>
                      Add a tailored deal to your timeline
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-gray-400 hover:text-white relative z-10'
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Input Area */}
              <form
                onSubmit={handleFormSubmit}
                className='p-8 space-y-5 overflow-y-auto flex-1'
              >
                {/* Advanced Multi-Mode Image Slot */}
                <div className='space-y-2'>
                  <label className='text-[11px] font-black uppercase tracking-widest text-gray-400 block'>
                    Cover Showcase Image
                  </label>

                  <div className='grid grid-cols-1 gap-4'>
                    {/* Visual Dropzone / File Upload Wrapper */}
                    <div className='relative border-2 border-dashed border-gray-200 hover:border-purple-500 rounded-[2rem] p-5 transition-all bg-gray-50 group flex flex-col items-center justify-center min-h-[140px] overflow-hidden'>
                      {formData.image ? (
                        <>
                          <img
                            src={formData.image}
                            alt='Upload preview'
                            className='absolute inset-0 w-full h-full object-cover'
                          />
                          <div className='absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                            <label className='bg-white text-gray-900 px-4 py-2 rounded-xl text-xs font-black cursor-pointer uppercase tracking-wider shadow-md'>
                              Change Image
                              <input
                                type='file'
                                accept='image/*'
                                onChange={handleImageUpload}
                                className='hidden'
                              />
                            </label>
                          </div>
                        </>
                      ) : (
                        <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer py-4'>
                          <div className='w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform'>
                            <UploadCloud size={22} />
                          </div>
                          <span className='text-xs font-black text-gray-900'>
                            Click to upload product media
                          </span>
                          <span className='text-[10px] text-gray-400 font-medium mt-1'>
                            Supports PNG, JPG, WebP
                          </span>
                          <input
                            type='file'
                            accept='image/*'
                            onChange={handleImageUpload}
                            className='hidden'
                          />
                        </label>
                      )}
                    </div>

                    {/* Web URL input fallback alternative option */}
                    <div className='relative flex items-center'>
                      <div className='absolute left-4 text-gray-400'>
                        <ImageIcon size={16} />
                      </div>
                      <input
                        type='url'
                        name='image'
                        placeholder='Or paste an image web link address instead...'
                        value={
                          formData.image.startsWith("blob:")
                            ? ""
                            : formData.image
                        }
                        onChange={handleInputChange}
                        className='w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-5 py-3 font-semibold text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-600 focus:bg-white transition-all text-xs'
                      />
                    </div>
                  </div>
                </div>

                {/* Service Name */}
                <div className='space-y-2'>
                  <label className='text-[11px] font-black uppercase tracking-widest text-gray-400 block'>
                    Service Display Title
                  </label>
                  <input
                    type='text'
                    name='name'
                    required
                    placeholder='e.g., Luxury Cocktail Bar Setup'
                    value={formData.name}
                    onChange={handleInputChange}
                    className='w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 font-semibold text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-600 focus:bg-white transition-all text-sm'
                  />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                  {/* Category Selection */}
                  <div className='space-y-2'>
                    <label className='text-[11px] font-black uppercase tracking-widest text-gray-400 block'>
                      Market Category
                    </label>
                    <div className='relative'>
                      <select
                        name='category'
                        value={formData.category}
                        onChange={handleInputChange}
                        className='w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 font-black text-gray-900 outline-none focus:border-purple-600 focus:bg-white transition-all text-xs uppercase tracking-wider appearance-none cursor-pointer'
                      >
                        <option value='Catering'>Catering</option>
                        <option value='Corporate'>Corporate</option>
                        <option value='Decoration'>Decoration</option>
                        <option value='Photography'>Photography</option>
                        <option value='DJ Services'>DJ Services</option>
                      </select>
                    </div>
                  </div>

                  {/* Pricing Input */}
                  <div className='space-y-2'>
                    <label className='text-[11px] font-black uppercase tracking-widest text-gray-400 block'>
                      Base Rate (₦)
                    </label>
                    <input
                      type='number'
                      name='price'
                      required
                      placeholder='500000'
                      value={formData.price}
                      onChange={handleInputChange}
                      className='w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 font-semibold text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-600 focus:bg-white transition-all text-sm'
                    />
                  </div>
                </div>

                {/* Description */}
                <div className='space-y-2'>
                  <label className='text-[11px] font-black uppercase tracking-widest text-gray-400 block'>
                    Service Description & Inclusions
                  </label>
                  <textarea
                    name='description'
                    required
                    rows='3'
                    placeholder='Provide explicit details regarding setup scale, staff structure, and unique value offers...'
                    value={formData.description}
                    onChange={handleInputChange}
                    className='w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 font-semibold text-gray-900 placeholder:text-gray-400 outline-none focus:border-purple-600 focus:bg-white transition-all text-sm resize-none leading-relaxed'
                  />
                </div>

                {/* Submit Action Buttons */}
                <div className='flex gap-4 pt-4 border-t border-gray-50 shrink-0'>
                  <button
                    type='button'
                    onClick={() => setIsModalOpen(false)}
                    className='flex-1 bg-gray-50 hover:bg-gray-100 text-gray-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-center'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='flex-[2] bg-purple-600 hover:bg-gray-950 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-purple-100 hover:shadow-none text-center'
                  >
                    Deploy Package
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VendorServices;
