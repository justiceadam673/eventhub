import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate here
import {
  Sparkles,
  User,
  Briefcase,
  Mail,
  Lock,
  ChevronRight,
  Store,
  Tag,
} from "lucide-react";

// Firebase imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase"; // adjust path if needed

const Signup = () => {
  const navigate = useNavigate(); // Initialized the navigation hook
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    businessName: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // 2. Save user in Firestore (users collection)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email,
        role: role,
        createdAt: new Date(),
      });

      // 3. If vendor, create vendor profile
      if (role === "vendor") {
        await setDoc(doc(db, "vendors", user.uid), {
          uid: user.uid,
          businessName: form.businessName,
          category: form.category,
          ownerName: form.fullName,
          email: form.email,
          createdAt: new Date(),
        });
      }

      // 4. Smooth client-side redirect based on role (Fixed to eliminate 404s)
      if (role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }

    setLoading(false);
  };

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

          {/* Role Selection */}
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
              type='button'
              onClick={() => setRole("buyer")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 z-10 text-sm font-bold transition-colors ${
                role === "buyer" ? "text-purple-600" : "text-gray-500"
              }`}
            >
              <User size={18} />
              I'm a Buyer
            </button>

            <button
              type='button'
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
          <form onSubmit={handleSignup} className='space-y-5'>
            {/* Full Name */}
            <div className='space-y-1.5'>
              <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>
                Full Name
              </label>
              <div className='relative group'>
                <User
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='text'
                  name='fullName'
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder='John Doe'
                  className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none'
                  required
                />
              </div>
            </div>

            {/* Vendor Fields */}
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
                        className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                        size={18}
                      />
                      <input
                        type='text'
                        name='businessName'
                        value={form.businessName}
                        onChange={handleChange}
                        placeholder='Elite Catering'
                        className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none'
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-1.5'>
                    <label className='text-xs font-bold text-gray-400 uppercase tracking-widest ml-1'>
                      Category
                    </label>
                    <div className='relative group'>
                      <Tag
                        className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                        size={18}
                      />
                      <select
                        name='category'
                        value={form.category}
                        onChange={handleChange}
                        className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none appearance-none'
                        required
                      >
                        <option value=''>Select Category</option>
                        <option value='Catering'>Catering</option>
                        <option value='Photography'>Photography</option>
                        <option value='Decoration'>Decoration</option>
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
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='name@example.com'
                  className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none'
                  required
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
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                  size={18}
                />
                <input
                  type='password'
                  name='password'
                  value={form.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='w-full bg-gray-50 border-none rounded-2xl px-12 py-4 outline-none'
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 mt-8'
            >
              {loading ? "Creating Account..." : "Create Account"}
              <ChevronRight size={20} />
            </button>
          </form>

          {/* Footer */}
          <div className='mt-10 text-center'>
            <p className='text-gray-500 font-medium'>
              Already have an account?{" "}
              <Link to='/signin' className='text-purple-600 font-bold'>
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
