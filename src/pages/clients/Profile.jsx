import React, { useState, useEffect, useRef } from "react";
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
  Loader2,
} from "lucide-react";
import { auth, db } from "../../firebase"; // Adjust path as needed
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300", // Fallback default image
  });

  // 1. Monitor Authentication State
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // 2. Stream User Profile Data Real-Time From Firestore
  useEffect(() => {
    if (!currentUser) return;

    const userDocRef = doc(db, "users", currentUser.uid);

    const unsubscribeSnapshot = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          // Fallback info from Auth provider if firestore document hasn't been created yet
          setUserData((prev) => ({
            ...prev,
            fullName: currentUser.displayName || "",
            email: currentUser.email || "",
          }));
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [currentUser]);

  // Handle text mutations
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Trigger hidden file selector input
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 3. Upload Image to ImgBB & Update Local Preview State
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        const uploadedUrl = result.data.url;
        setUserData((prev) => ({ ...prev, profileImage: uploadedUrl }));
      } else {
        console.error("ImgBB upload failed:", result.error?.message);
        alert("Failed to upload image. Check your ImgBB key config.");
      }
    } catch (error) {
      console.error("Network error during ImgBB upload:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  // 4. Persist Text and Image Changes to Firestore Data Store
  const handleSave = async () => {
    if (!currentUser) return;
    setSaving(true);

    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      // setDoc with merge: true creates the document if it doesn't exist, or overrides fields safely
      await setDoc(userDocRef, userData, { merge: true });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile to Firestore:", error);
      alert("Error saving shifts. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-[#fafafa]'>
        <Loader2 className='w-12 h-12 text-purple-600 animate-spin' />
        <p className='mt-4 text-gray-500 font-bold'>
          Loading profile configurations...
        </p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-[#fafafa]'>
        <p className='text-gray-500 font-bold text-lg'>
          Please log in to manage your account details.
        </p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-12'>
      <div className='absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-purple-50 to-transparent -z-10' />

      <main className='max-w-5xl mx-auto p-4 md:p-10'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pt-12'>
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
            disabled={saving || uploadingImage}
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
        <div className='bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden'>
          {/* Cover Photo Banner */}
          <div className='h-60 bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 relative'>
            <div className='absolute inset-0 bg-black/10' />

            {/* Profile Image Wrap */}
            <div className='absolute -bottom-16 left-10'>
              <div className='relative group'>
                <div className='w-36 h-36 rounded-[2.5rem] bg-white p-1.5 shadow-xl flex items-center justify-center overflow-hidden'>
                  {uploadingImage ? (
                    <div className='absolute inset-0 bg-black/40 flex items-center justify-center z-10 rounded-[2.2rem]'>
                      <Loader2 className='text-white animate-spin' size={24} />
                    </div>
                  ) : null}
                  <img
                    src={userData.profileImage}
                    alt='profile'
                    className='w-full h-full rounded-[2.2rem] object-cover'
                  />
                </div>

                {/* Hidden File Input Reference */}
                <input
                  type='file'
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept='image/*'
                  className='hidden'
                />

                <AnimatePresence>
                  {isEditing && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      onClick={handleImageClick}
                      disabled={uploadingImage}
                      type='button'
                      className='absolute bottom-2 right-2 bg-purple-600 text-white p-3 rounded-2xl shadow-lg hover:bg-gray-900 transition-colors border-4 border-white'
                    >
                      <Camera size={20} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Account Metrics and Meta Segment */}
          <div className='pt-20 px-10 pb-10'>
            <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-8 border-b border-gray-50 pb-10 mb-10'>
              <div>
                <div className='flex items-center gap-2 mb-1'>
                  <h3 className='text-3xl font-black text-gray-900'>
                    {userData.fullName || "Complete Profile"}
                  </h3>
                  <ShieldCheck size={24} className='text-purple-600' />
                </div>
                <p className='text-gray-500 font-bold flex items-center gap-2'>
                  <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
                  Premium Client
                </p>
              </div>

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

            {/* Input Dashboard Fields */}
            <div className='grid md:grid-cols-2 gap-8'>
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

              {/* Biography Details */}
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

            {/* Execution Control Footer */}
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
                    disabled={saving || uploadingImage}
                    className='flex-1 md:flex-none bg-gray-900 hover:bg-purple-600 text-white px-10 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:bg-gray-400'
                  >
                    {saving ? (
                      <Loader2 className='w-5 h-5 animate-spin' />
                    ) : (
                      <CheckCircle2 size={20} />
                    )}
                    {saving ? "Saving Changes..." : "Save All Changes"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation / Secondary Control Center Cards */}
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
        </div>
      </main>
    </div>
  );
};

export default ClientProfile;
