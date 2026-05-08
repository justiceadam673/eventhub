import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  CheckCircle2,
  Edit3,
  X,
  Calendar,
  Heart,
  ShieldCheck,
} from "lucide-react";

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "Justice Adam",
    email: "justiceadam@gmail.com",
    phone: "+234 812 345 6789",
    location: "Abuja, Nigeria",
    bio: "I love planning amazing events and connecting with trusted vendors. Currently organizing a grand wedding for December!",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Add logic here to sync with a backend
    setIsEditing(false);
  };

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-12'>
      {/* Decorative Background Accent */}
      <div className='absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-purple-50 to-transparent -z-10' />

      <main className='max-w-5xl mx-auto p-4 md:p-10'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className='text-4xl font-black tracking-tight text-gray-900'>
              Account <span className='text-purple-600'>Settings</span>
            </h2>
            <p className='text-gray-500 mt-2 font-medium'>
              Manage your identity and preferences across EventHub.
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold transition-all shadow-sm ${
              isEditing
                ? "bg-white text-gray-500 border border-gray-200"
                : "bg-gray-900 text-white hover:bg-purple-600"
            }`}
          >
            {isEditing ? (
              <>
                <X size={18} /> Cancel
              </>
            ) : (
              <>
                <Edit3 size={18} /> Edit Profile
              </>
            )}
          </motion.button>
        </div>

        {/* Profile Card */}
        <div className='bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden'>
          {/* Cover Photo / Banner */}
          <div className='h-60 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative'>
            <div className='absolute inset-0 bg-black/10' />

            {/* Profile Image Overlapping Banner */}
            <div className='absolute -bottom-16 left-10'>
              <div className='relative group'>
                <div className='w-36 h-36 rounded-[2.5rem] bg-white p-1.5 shadow-xl'>
                  <img
                    src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
                    alt='profile'
                    className='w-full h-full rounded-[2.2rem] object-cover'
                  />
                </div>
                <AnimatePresence>
                  {isEditing && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className='absolute bottom-2 right-2 bg-purple-600 text-white p-3 rounded-2xl shadow-lg hover:bg-gray-900 transition-colors border-4 border-white'
                    >
                      <Camera size={20} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Profile Stats Bar */}
          <div className='pt-20 px-10 pb-10'>
            <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-gray-50 pb-10 mb-10'>
              <div>
                <div className='flex items-center gap-2 mb-1'>
                  <h3 className='text-3xl font-black text-gray-900'>
                    {userData.fullName}
                  </h3>
                  <ShieldCheck size={24} className='text-purple-600' />
                </div>
                <p className='text-gray-500 font-bold flex items-center gap-2'>
                  <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                  Premium Client
                </p>
              </div>

              {/* Mini Stats (Interesting Touch) */}
              <div className='flex gap-4 md:gap-8'>
                <div className='text-center'>
                  <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1'>
                    Bookings
                  </p>
                  <div className='flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl text-purple-600 font-bold'>
                    <Calendar size={16} /> 12
                  </div>
                </div>
                <div className='text-center'>
                  <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1'>
                    Saved
                  </p>
                  <div className='flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-xl text-pink-600 font-bold'>
                    <Heart size={16} /> 24
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className='grid md:grid-cols-2 gap-8'>
              {/* Field Wrapper Component would be cleaner, but keeping it inline for your ease */}
              {[
                {
                  label: "Full Name",
                  name: "fullName",
                  value: userData.fullName,
                  icon: <User size={18} />,
                  type: "text",
                },
                {
                  label: "Email Address",
                  name: "email",
                  value: userData.email,
                  icon: <Mail size={18} />,
                  type: "email",
                },
                {
                  label: "Phone Number",
                  name: "phone",
                  value: userData.phone,
                  icon: <Phone size={18} />,
                  type: "tel",
                },
                {
                  label: "Location",
                  name: "location",
                  value: userData.location,
                  icon: <MapPin size={18} />,
                  type: "text",
                },
              ].map((field) => (
                <div key={field.name} className='space-y-2 group'>
                  <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                    {field.label}
                  </label>
                  <div className='relative transition-all'>
                    <div
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? "text-purple-600" : "text-gray-400"}`}
                    >
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full rounded-2xl pl-12 pr-4 py-4 outline-none font-bold transition-all border-2 ${
                        isEditing
                          ? "bg-white border-purple-100 ring-4 ring-purple-50 text-gray-900"
                          : "bg-gray-50 border-transparent text-gray-500 cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>
              ))}

              {/* Bio Field */}
              <div className='md:col-span-2 space-y-2'>
                <label className='text-xs font-black text-gray-400 uppercase tracking-widest ml-1'>
                  Personal Biography
                </label>
                <textarea
                  rows='4'
                  name='bio'
                  value={userData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full rounded-2xl px-5 py-4 outline-none font-bold transition-all border-2 resize-none ${
                    isEditing
                      ? "bg-white border-purple-100 ring-4 ring-purple-50 text-gray-900"
                      : "bg-gray-50 border-transparent text-gray-500 cursor-not-allowed"
                  }`}
                ></textarea>
              </div>
            </div>

            {/* Action Footer */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className='mt-12 flex items-center gap-4'
                >
                  <button
                    onClick={handleSave}
                    className='flex-1 md:flex-none bg-gray-900 hover:bg-purple-600 text-white px-10 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200 hover:shadow-purple-200'
                  >
                    <CheckCircle2 size={20} />
                    Save All Changes
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Security / Extra Links Area */}
        <div className='mt-8 grid md:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4 hover:shadow-lg transition-all cursor-pointer group'>
            <div className='bg-blue-50 text-blue-600 p-3 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all'>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className='font-bold'>Password & Security</h4>
              <p className='text-xs text-gray-400 font-medium'>
                Manage your login info
              </p>
            </div>
          </div>
          {/* Add more cards for Billing, Notifications etc. */}
        </div>
      </main>
    </div>
  );
};

export default ClientProfile;
