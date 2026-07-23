// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   CalendarHeart,
//   MessageSquare,
//   Search,
//   Bell,
//   Heart,
//   Star,
//   ShieldCheck,
//   MapPin,
//   ArrowUpRight,
// } from "lucide-react";
// import { auth, db } from "../../firebase";
// import {
//   collection,
//   doc,
//   getDoc,
//   onSnapshot,
//   orderBy,
//   query,
//   limit,
//   where,
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   // const [featuredVendors, setFeaturedVendors] = useState([]);
//   const [featuredServices, setFeaturedServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       setUser(firebaseUser);

//       if (!firebaseUser) {
//         setUserProfile(null);
//         setBookings([]);
//         setFeaturedServices([]);
//         setLoading(false);
//         return;
//       }

//       try {
//         const userRef = doc(db, "users", firebaseUser.uid);
//         const userSnap = await getDoc(userRef);

//         setUserProfile(userSnap.exists() ? userSnap.data() : null);
//       } catch (err) {
//         console.error("Error loading user profile:", err);
//         setError("Unable to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     if (!user) return;

//     const bookingsQuery = query(
//       collection(db, "bookings"),
//       where("clientId", "==", user.uid)
//     );

//     const bookingsUnsub = onSnapshot(
//       bookingsQuery,
//       (snapshot) => {
//         const fetchedBookings = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setBookings(fetchedBookings);
//       },
//       (err) => {
//         console.error("Error loading bookings:", err);
//         setError("Unable to load bookings.");
//       }
//     );

//     // const vendorsQuery = query(
//     //   collection(db, "vendors"),
//     //   orderBy("createdAt", "desc"),
//     //   limit(3)
//     // );
//     const servicesQuery = query(
//       collection(db, "services"),
//       orderBy("createdAt", "desc")
//     );

//     // const vendorsUnsub = onSnapshot(
//     //   vendorsQuery,
//     //   (snapshot) => {
//     //     const fetchedVendors = snapshot.docs.map((doc) => ({
//     //       id: doc.id,
//     //       ...doc.data(),
//     //     }));
//     //     setFeaturedVendors(fetchedVendors);
//     //   },
//     //   (err) => {
//     //     console.error("Error loading featured vendors:", err);
//     //   }
//     // );
//     const servicesUnsub = onSnapshot(servicesQuery, (snapshot) => {
//       const fetchedServices = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setFeaturedServices(fetchedServices);
//     });

//     return () => {
//       bookingsUnsub();
//       // vendorsUnsub();
//       servicesUnsub();
//     };
//   }, [user]);

//   const totalBookings = bookings.length;
//   const uniqueVendors = new Set(bookings.map((b) => b.vendorId)).size;
//   const confirmedBookings = bookings.filter(
//     (booking) => booking.status === "Confirmed"
//   ).length;

//   const stats = [
//     {
//       title: "Bookings",
//       value: totalBookings,
//       icon: <CalendarHeart size={24} />,
//       color: "text-purple-600",
//       bg: "bg-purple-50",
//     },
//     {
//       title: "Vendors Booked",
//       value: uniqueVendors,
//       icon: <Heart size={24} />,
//       color: "text-pink-600",
//       bg: "bg-pink-50",
//     },
//     {
//       title: "Confirmed",
//       value: confirmedBookings,
//       icon: <MessageSquare size={24} />,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//     },
//   ];

//   const welcomeName = userProfile?.fullName || "there";

//   if (loading) {
//     return (
//       <div className='min-h-screen flex items-center justify-center bg-[#fafafa]'>
//         <p className='text-gray-500 font-semibold'>Loading your dashboard...</p>
//       </div>
//     );
//   }

//   const serviceCards = featuredServices.map((service, index) => ({
//     id: service.id,
//     name: service.name || "Untitled Service",
//     category: service.category || "Service",
//     rating: service.rating || 5,
//     reviews: service.bookings || 0,
//     price: `₦${Number(service.price || 0).toLocaleString()}`,
//     location: service.location || "Nigeria",
//     image:
//       service.image ||
//       [
//         "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600",
//         "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
//         "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600",
//       ][index % 3],
//   }));

//   return (
//     <div className='min-h-screen bg-[#fafafa] flex font-sans selection:bg-purple-200'>
//       {/* Main Content - Offset for sidebar */}
//       <main className='flex-1  p-6 md:p-10 relative overflow-hidden'>
//         {/* Decorative background blobs */}
//         <div className='absolute top-[-10%] right-[-5%] w-[40%] h-[30%] rounded-full bg-purple-100/40 blur-[100px] pointer-events-none' />

//         {/* Topbar */}
//         <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12 relative z-10'>
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <h2 className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight'>
//               Welcome back,{" "}
//               <span className='text-purple-600'>{welcomeName}</span> 👋
//             </h2>
//             <p className='text-gray-500 mt-2 font-medium'>
//               Here is what's happening with your events today.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className='flex items-center gap-4 w-full xl:w-auto'
//           >
//             {/* Search Bar */}
//             <div className='bg-white rounded-full flex items-center px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full xl:w-87.5 group focus-within:ring-2 focus-within:ring-purple-100 transition-all'>
//               <Search
//                 size={20}
//                 className='text-gray-400 group-focus-within:text-purple-600 transition-colors'
//               />
//               <input
//                 type='text'
//                 placeholder='Search vendors, categories...'
//                 className='w-full outline-none ml-3 text-sm font-medium text-gray-700 bg-transparent'
//               />
//             </div>

//             {/* Notification Bell */}
//             <button className='bg-white p-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-gray-400 hover:text-purple-600 transition-colors relative'>
//               <span className='absolute top-3 right-3.5 w-2 h-2 bg-pink-500 rounded-full border-2 border-white'></span>
//               <Bell size={20} />
//             </button>
//           </motion.div>
//         </div>

//         {error && (
//           <div className='mb-6 rounded-3xl border border-red-100 bg-red-50 p-5 text-red-700'>
//             <p className='font-semibold'>
//               Unable to load some dashboard items.
//             </p>
//             <p className='text-sm mt-1'>{error}</p>
//           </div>
//         )}

//         {/* Stats Section */}
//         <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
//           {stats.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ y: -5 }}
//               className='bg-white p-6 rounded-4xl shadow-sm border border-gray-100 flex items-center justify-between group'
//             >
//               <div>
//                 <p className='text-gray-400 text-sm font-bold uppercase tracking-widest mb-1'>
//                   {stat.title}
//                 </p>
//                 <h3 className='text-4xl font-black text-gray-900 group-hover:text-purple-600 transition-colors'>
//                   {stat.value}
//                 </h3>
//               </div>
//               <div
//                 className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}
//               >
//                 {stat.icon}
//               </div>
//             </motion.div>
//           ))}
//         </section>

//         {/* Featured Vendors */}
//         <section>
//           <div className='flex items-center justify-between mb-8'>
//             <h3 className='text-2xl font-black text-gray-900'>
//               Featured Vendors
//             </h3>
//             <button className='text-purple-600 font-bold hover:text-purple-700 flex items-center gap-1 group'>
//               View All
//               <ArrowUpRight
//                 size={18}
//                 className='group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
//               />
//             </button>
//           </div>

//           <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
//             {serviceCards.map((service, index) => (
//               <motion.div
//                 key={service.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 + 0.3 }}
//                 whileHover={{ y: -8 }}
//                 className='group relative bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-500 flex flex-col'
//               >
//                 {/* Image Section */}
//                 <div className='relative h-56 overflow-hidden'>
//                   <img
//                     src={service.image}
//                     alt={service.name}
//                     className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
//                   />

//                   {/* Badges */}
//                   <div className='absolute top-4 left-4 flex gap-2'>
//                     <span className='bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1'>
//                       <ShieldCheck size={12} className='text-purple-600' />
//                       Verified
//                     </span>
//                   </div>
//                   <button className='absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-pink-500 hover:scale-110 transition-all shadow-sm'>
//                     <Heart
//                       size={16}
//                       className='hover:fill-pink-500 transition-colors'
//                     />
//                   </button>

//                   {/* Rating Gradient */}
//                   <div className='absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/60 to-transparent' />
//                   <div className='absolute bottom-4 left-4 flex items-center gap-2 text-white'>
//                     <div className='flex items-center gap-1 bg-purple-600 px-2 py-1 rounded-lg text-xs font-bold'>
//                       <Star size={12} className='fill-white' />
//                       {service.rating}
//                     </div>
//                     <span className='text-xs font-medium text-gray-200'>
//                       ({service.reviews})
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className='p-6 flex flex-col flex-1'>
//                   <div className='flex justify-between items-start mb-2'>
//                     <div>
//                       <span className='text-purple-600 text-xs font-bold uppercase tracking-wider'>
//                         {service.category}
//                       </span>
//                       <h4 className='text-xl font-bold text-gray-900 mt-1 group-hover:text-purple-600 transition-colors'>
//                         {service.name}
//                       </h4>
//                     </div>
//                     <span className='text-gray-900 font-bold text-sm bg-gray-50 px-2 py-1 rounded-lg'>
//                       {service.price}
//                     </span>
//                   </div>

//                   <div className='flex items-center gap-1 text-gray-500 text-sm mb-6'>
//                     <MapPin size={14} />
//                     {service.location}
//                   </div>

//                   {/* Action Buttons */}
//                   <div className='mt-auto flex items-center gap-2'>
//                     <button className='flex-1 bg-gray-900 hover:bg-purple-600 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors'>
//                       View Profile
//                     </button>
//                     <button className='p-3.5 bg-purple-50 text-purple-600 rounded-2xl hover:bg-purple-100 transition-colors'>
//                       <MessageSquare size={20} />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarHeart,
  MessageSquare,
  Search,
  Bell,
  Star,
  MapPin,
  ArrowUpRight,
  X,
  Phone,
  Mail,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// Dynamic fallback image map based on service name/category
const SERVICE_FALLBACK_IMAGES = {
  catering:
    "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop",
  photography:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
  videography:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
  venue:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop",
  music:
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
  dj: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
  decor:
    "https://images.unsplash.com/photo-1519225495810-7517c296517d?q=80&w=600&auto=format&fit=crop",
  makeup:
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop",
  hair: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop",
  planner:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
  generic:
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=600&auto=format&fit=crop",
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State & Dynamic Vendor / Review Data
  const [selectedService, setSelectedService] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [loadingVendor, setLoadingVendor] = useState(false);
  const [vendorRatingData, setVendorRatingData] = useState({
    avgRating: 0,
    count: 0,
  });

  // Auto-booking status feedback
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setUserProfile(null);
        setBookings([]);
        setFeaturedServices([]);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        setUserProfile(userSnap.exists() ? userSnap.data() : null);
      } catch (err) {
        console.error("Error loading user profile:", err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const bookingsQuery = query(
      collection(db, "bookings"),
      where("clientId", "==", user.uid)
    );

    const bookingsUnsub = onSnapshot(
      bookingsQuery,
      (snapshot) => {
        const fetchedBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(fetchedBookings);
      },
      (err) => {
        console.error("Error loading bookings:", err);
        setError("Unable to load bookings.");
      }
    );

    const servicesQuery = query(
      collection(db, "services"),
      orderBy("createdAt", "desc")
    );

    const servicesUnsub = onSnapshot(servicesQuery, (snapshot) => {
      const fetchedServices = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFeaturedServices(fetchedServices);
    });

    return () => {
      bookingsUnsub();
      servicesUnsub();
    };
  }, [user]);

  // Fetch Vendor Profile & Calculate Dynamic Rating
  const handleOpenProfile = async (service) => {
    setSelectedService(service);
    setVendorDetails(null);
    setLoadingVendor(true);
    setBookingSuccess(false);

    const vendorId = service.vendorId || service.userId;

    if (vendorId) {
      try {
        // Fetch Vendor Info
        const vendorRef = doc(db, "users", vendorId);
        const vendorSnap = await getDoc(vendorRef);

        if (vendorSnap.exists()) {
          setVendorDetails(vendorSnap.data());
        } else {
          setVendorDetails({
            email: service.email || service.vendorEmail || "Not provided",
            phone: service.phone || service.vendorPhone || "Not provided",
          });
        }

        // Fetch Dynamic Ratings from Firestore "reviews" collection
        const reviewsQ = query(
          collection(db, "reviews"),
          where("vendorId", "==", vendorId)
        );
        const reviewsUnsub = onSnapshot(reviewsQ, (snapshot) => {
          if (!snapshot.empty) {
            const total = snapshot.docs.reduce(
              (acc, d) => acc + (Number(d.data().rating) || 0),
              0
            );
            const count = snapshot.docs.length;
            const avg = (total / count).toFixed(1);
            setVendorRatingData({ avgRating: avg, count });
          } else {
            setVendorRatingData({
              avgRating: service.rating || 0,
              count: service.reviewsCount || 0,
            });
          }
        });
      } catch (err) {
        console.error("Error fetching vendor profile or reviews:", err);
        setVendorDetails({
          email: service.email || service.vendorEmail || "Not available",
          phone: service.phone || service.vendorPhone || "Not available",
        });
      }
    } else {
      setVendorDetails({
        email: service.email || service.vendorEmail || "Not provided",
        phone: service.phone || service.vendorPhone || "Not provided",
      });
      setVendorRatingData({
        avgRating: service.rating || 0,
        count: service.reviewsCount || 0,
      });
    }

    setLoadingVendor(false);
  };

  // Helper to open direct WhatsApp conversation
  const handleOpenWhatsApp = (service, customPhone) => {
    const rawPhone =
      customPhone ||
      vendorDetails?.phoneNumber ||
      vendorDetails?.phone ||
      service.phone;

    if (!rawPhone) {
      alert("Vendor has not provided a phone number for messaging.");
      return;
    }

    // Clean phone string to digits only for WhatsApp link format
    const cleanPhone = String(rawPhone).replace(/[^0-9]/g, "");
    const serviceName = service.name || service.category || "service";
    const text = encodeURIComponent(
      `Hello! I found your service "${serviceName}" on the platform and would like to make an inquiry.`
    );

    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  // Automatically book the vendor service in Firestore
  const handleAutomaticBooking = async () => {
    if (!user) {
      alert("Please log in to book a service.");
      return;
    }

    if (!selectedService) return;

    setBookingInProgress(true);

    try {
      const vendorId =
        selectedService.vendorId || selectedService.userId || "unknown_vendor";
      const vendorName =
        selectedService.name || vendorDetails?.fullName || "Unknown Vendor";

      await addDoc(collection(db, "bookings"), {
        clientId: user.uid,
        clientName: userProfile?.fullName || user.email || "Client",
        clientEmail: user.email,
        vendorId: vendorId,
        vendorName: vendorName,
        vendorImage: selectedService.image || "",
        service: selectedService.category || selectedService.name || "Service",
        totalPrice: selectedService.priceRaw || selectedService.price || 0,
        status: "Pending",
        location: selectedService.location || "Nigeria",
        date: "To be confirmed via chat",
        createdAt: serverTimestamp(),
      });

      setBookingSuccess(true);
    } catch (err) {
      console.error("Error creating automated booking:", err);
      alert("Failed to complete booking. Please try again.");
    } finally {
      setBookingInProgress(false);
    }
  };

  const totalBookings = bookings.length;
  const uniqueVendors = new Set(bookings.map((b) => b.vendorId)).size;
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const stats = [
    {
      title: "Bookings",
      value: totalBookings,
      icon: <CalendarHeart size={24} />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Vendors Booked",
      value: uniqueVendors,
      icon: <CalendarHeart size={24} />,
      color: "text-pink-600",
      bg: "bg-pink-50",
    },
    {
      title: "Confirmed",
      value: confirmedBookings,
      icon: <MessageSquare size={24} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  const welcomeName = userProfile?.fullName || "there";

  const getServiceImage = (service) => {
    if (service.image) return service.image;
    if (service.vendorImage) return service.vendorImage;

    const key = (service.category || service.name || "").toLowerCase();
    for (const type of Object.keys(SERVICE_FALLBACK_IMAGES)) {
      if (key.includes(type)) return SERVICE_FALLBACK_IMAGES[type];
    }
    return SERVICE_FALLBACK_IMAGES.generic;
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#fafafa]'>
        <p className='text-gray-500 font-semibold'>Loading your dashboard...</p>
      </div>
    );
  }

  const serviceCards = featuredServices.map((service) => ({
    ...service,
    id: service.id,
    name: service.name || service.vendorName || "Untitled Service",
    category: service.category || service.service || "Service",
    rating: service.rating || 0,
    reviews: service.reviewsCount || 0,
    priceRaw: service.price || 0,
    price: service.price
      ? `₦${Number(service.price).toLocaleString()}`
      : "Quote on Request",
    location: service.location || "Nigeria",
    image: getServiceImage(service),
    description:
      service.description ||
      "Professional service provider dedicated to making your events unforgettable. High quality setup and execution guaranteed.",
  }));

  return (
    <div className='min-h-screen bg-[#fafafa] flex font-sans selection:bg-purple-200'>
      {/* Main Content */}
      <main className='flex-1 p-6 md:p-10 relative overflow-hidden'>
        {/* Decorative background blur */}
        <div className='absolute top-[-10%] right-[-5%] w-[40%] h-[30%] rounded-full bg-purple-100/40 blur-[100px] pointer-events-none' />

        {/* Topbar */}
        <div className='flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-12 relative z-10'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className='text-3xl md:text-4xl font-black text-gray-900 tracking-tight'>
              Welcome back,{" "}
              <span className='text-purple-600'>{welcomeName}</span> 👋
            </h2>
            <p className='text-gray-500 mt-2 font-medium'>
              Here is what's happening with your events today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className='flex items-center gap-4 w-full xl:w-auto'
          >
            {/* Search Bar */}
            <div className='bg-white rounded-full flex items-center px-5 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full xl:w-87.5 group focus-within:ring-2 focus-within:ring-purple-100 transition-all'>
              <Search
                size={20}
                className='text-gray-400 group-focus-within:text-purple-600 transition-colors'
              />
              <input
                type='text'
                placeholder='Search vendors, categories...'
                className='w-full outline-none ml-3 text-sm font-medium text-gray-700 bg-transparent'
              />
            </div>

            {/* Notification Bell */}
            <button className='bg-white p-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-gray-400 hover:text-purple-600 transition-colors relative'>
              <span className='absolute top-3 right-3.5 w-2 h-2 bg-pink-500 rounded-full border-2 border-white'></span>
              <Bell size={20} />
            </button>
          </motion.div>
        </div>

        {error && (
          <div className='mb-6 rounded-3xl border border-red-100 bg-red-50 p-5 text-red-700'>
            <p className='font-semibold'>
              Unable to load some dashboard items.
            </p>
            <p className='text-sm mt-1'>{error}</p>
          </div>
        )}

        {/* Stats Section */}
        <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className='bg-white p-6 rounded-4xl shadow-sm border border-gray-100 flex items-center justify-between group'
            >
              <div>
                <p className='text-gray-400 text-sm font-bold uppercase tracking-widest mb-1'>
                  {stat.title}
                </p>
                <h3 className='text-4xl font-black text-gray-900 group-hover:text-purple-600 transition-colors'>
                  {stat.value}
                </h3>
              </div>
              <div
                className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}
              >
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Featured Vendors */}
        <section>
          <div className='flex items-center justify-between mb-8'>
            <h3 className='text-2xl font-black text-gray-900'>
              Featured Vendors
            </h3>
            <button className='text-purple-600 font-bold hover:text-purple-700 flex items-center gap-1 group cursor-pointer'>
              View All
              <ArrowUpRight
                size={18}
                className='group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform'
              />
            </button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
            {serviceCards.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -8 }}
                className='group relative bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-500 flex flex-col'
              >
                {/* Image Section */}
                <div className='relative h-56 overflow-hidden'>
                  <img
                    src={service.image}
                    alt={service.name}
                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                  />

                  {/* Rating Gradient Overlay */}
                  <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-4 left-4 flex items-center gap-2 text-white'>
                    <div className='flex items-center gap-1 bg-purple-600 px-2.5 py-1 rounded-lg text-xs font-bold'>
                      <Star size={12} className='fill-white' />
                      {service.rating > 0 ? service.rating : "New"}
                    </div>
                    {service.reviews > 0 && (
                      <span className='text-xs font-medium text-gray-200'>
                        ({service.reviews})
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className='p-6 flex flex-col flex-1'>
                  <div className='flex justify-between items-start mb-2'>
                    <div>
                      <span className='text-purple-600 text-xs font-bold uppercase tracking-wider'>
                        {service.category}
                      </span>
                      <h4 className='text-xl font-bold text-gray-900 mt-1 group-hover:text-purple-600 transition-colors'>
                        {service.name}
                      </h4>
                    </div>
                    <span className='text-gray-900 font-bold text-sm bg-gray-50 px-2 py-1 rounded-lg'>
                      {service.price}
                    </span>
                  </div>

                  <div className='flex items-center gap-1 text-gray-500 text-sm mb-6'>
                    <MapPin size={14} />
                    {service.location}
                  </div>

                  {/* Action Buttons */}
                  <div className='mt-auto flex items-center gap-2'>
                    <button
                      onClick={() => handleOpenProfile(service)}
                      className='flex-1 bg-gray-900 hover:bg-purple-600 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer'
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleOpenWhatsApp(service)}
                      title='Chat on WhatsApp'
                      className='p-3.5 bg-purple-50 text-purple-600 rounded-2xl hover:bg-purple-100 transition-colors cursor-pointer'
                    >
                      <MessageSquare size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Vendor Profile Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className='bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-gray-100'
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setSelectedService(null);
                  setVendorDetails(null);
                  setBookingSuccess(false);
                }}
                className='absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-600 hover:text-black transition-colors'
              >
                <X size={20} />
              </button>

              {/* Cover Image */}
              <div className='relative h-64 w-full'>
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Details Body */}
              <div className='p-6 md:p-8'>
                <div className='flex justify-between items-start mb-4'>
                  <div>
                    <span className='text-xs font-black text-purple-600 uppercase tracking-widest'>
                      {selectedService.category}
                    </span>
                    <h3 className='text-3xl font-black text-gray-900 mt-1'>
                      {selectedService.name}
                    </h3>
                  </div>
                  <div className='text-right'>
                    <span className='text-2xl font-black text-purple-600'>
                      {selectedService.price}
                    </span>
                  </div>
                </div>

                {/* Dynamic Rating */}
                <div className='flex flex-wrap gap-4 items-center text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100'>
                  <div className='flex items-center gap-1 font-bold text-gray-900 bg-purple-50 px-3 py-1 rounded-lg text-purple-700'>
                    <Star size={16} className='fill-purple-700' />
                    {vendorRatingData.avgRating > 0
                      ? `${vendorRatingData.avgRating} (${vendorRatingData.count} reviews)`
                      : "New Service"}
                  </div>
                  <div className='flex items-center gap-1 font-medium'>
                    <MapPin size={16} className='text-gray-400' />
                    {selectedService.location}
                  </div>
                </div>

                {/* About Section */}
                <div className='mb-6'>
                  <h4 className='text-base font-bold text-gray-900 mb-2'>
                    About this service
                  </h4>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {selectedService.description}
                  </p>
                </div>

                {/* Vendor Contact Information */}
                <div className='bg-gray-50 rounded-2xl p-5 mb-8 space-y-3'>
                  <h5 className='text-xs font-black uppercase text-gray-400 tracking-wider mb-2'>
                    Vendor Contact Info
                  </h5>

                  {loadingVendor ? (
                    <div className='flex items-center gap-2 text-purple-600 py-2'>
                      <Loader2 size={18} className='animate-spin' />
                      <span className='text-xs font-bold'>
                        Fetching contact details...
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className='flex items-center gap-3 text-sm text-gray-800 font-semibold'>
                        <Phone size={18} className='text-purple-600 shrink-0' />
                        <span>
                          {vendorDetails?.phoneNumber ||
                            vendorDetails?.phone ||
                            vendorDetails?.mobile ||
                            "No phone provided"}
                        </span>
                      </div>
                      <div className='flex items-center gap-3 text-sm text-gray-800 font-semibold'>
                        <Mail size={18} className='text-purple-600 shrink-0' />
                        <span>
                          {vendorDetails?.email || "No email provided"}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Success Feedback Banner */}
                {bookingSuccess && (
                  <div className='mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3'>
                    <CheckCircle2 size={24} className='shrink-0' />
                    <div className='text-sm'>
                      <p className='font-bold'>
                        Booking requested successfully!
                      </p>
                      <p className='text-xs opacity-90'>
                        Check your "My Bookings" page to track its status.
                      </p>
                    </div>
                  </div>
                )}

                {/* Modal Action Buttons */}
                <div className='flex items-center gap-3'>
                  <button
                    disabled={bookingInProgress || bookingSuccess}
                    onClick={handleAutomaticBooking}
                    className='flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-bold py-3.5 rounded-2xl transition-colors text-center cursor-pointer flex items-center justify-center gap-2'
                  >
                    {bookingInProgress ? (
                      <>
                        <Loader2 size={18} className='animate-spin' />
                        Processing Booking...
                      </>
                    ) : bookingSuccess ? (
                      "Service Booked ✓"
                    ) : (
                      "Book Service Now"
                    )}
                  </button>

                  <button
                    onClick={() => handleOpenWhatsApp(selectedService)}
                    title='Chat on WhatsApp'
                    className='p-3.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-2xl transition-colors cursor-pointer'
                  >
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
