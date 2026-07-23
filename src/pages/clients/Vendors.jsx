// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   MapPin,
//   Star,
//   Heart,
//   SlidersHorizontal,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   Phone,
//   Mail,
//   Globe,
//   Clock,
//   Briefcase,
// } from "lucide-react";
// import { db } from "../../firebase";
// import { collection, getDocs } from "firebase/firestore";

// // Service Detail Overlay Component
// const ServiceProfileOverlay = ({ service, isOpen, onClose }) => {
//   if (!isOpen || !service) return null;

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
//       >
//         <motion.div
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           onClick={(e) => e.stopPropagation()}
//           className='bg-white rounded-4xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative'
//         >
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className='absolute top-4 right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition'
//           >
//             <X size={24} className='text-gray-600' />
//           </button>

//           {/* Header Image (ImgBB link) */}
//           <div className='relative h-80 overflow-hidden'>
//             {service.image ? (
//               <img
//                 src={service.image}
//                 alt={service.serviceName}
//                 className='w-full h-full object-cover'
//               />
//             ) : (
//               <div className='w-full h-full bg-purple-50 flex items-center justify-center text-purple-300'>
//                 <Briefcase size={64} />
//               </div>
//             )}
//             <div className='absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-gray-900/80 to-transparent' />
//             <div className='absolute bottom-4 left-6 flex items-center gap-2'>
//               <div className='flex items-center gap-1 bg-white text-gray-900 px-3 py-2 rounded-lg font-bold shadow-sm'>
//                 <Star size={16} className='fill-yellow-400 text-yellow-400' />
//                 {service.rating || "N/A"}
//               </div>
//               <span className='text-white text-sm font-medium drop-shadow-md'>
//                 ({service.reviews || 0} reviews)
//               </span>
//             </div>
//           </div>

//           {/* Content */}
//           <div className='p-8'>
//             {/* Title & Vendor / Category */}
//             <div className='mb-6'>
//               <div className='flex gap-2 mb-3'>
//                 <span className='bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase'>
//                   {service.category}
//                 </span>
//                 <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold'>
//                   By: {service.vendorName}
//                 </span>
//               </div>
//               <h1 className='text-4xl font-black text-gray-900 mb-2'>
//                 {service.serviceName}
//               </h1>
//               <div className='flex items-center gap-2 text-gray-600'>
//                 <MapPin size={18} />
//                 <span className='font-medium'>{service.location}</span>
//               </div>
//             </div>

//             {/* Description */}
//             {service.description && (
//               <div className='mb-6'>
//                 <h3 className='text-lg font-bold text-gray-900 mb-2'>
//                   About Service
//                 </h3>
//                 <p className='text-gray-600 leading-relaxed'>
//                   {service.description}
//                 </p>
//               </div>
//             )}

//             {/* Contact Information */}
//             <div className='mb-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
//               {service.phone && (
//                 <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
//                   <Phone size={18} className='text-purple-600' />
//                   <div>
//                     <p className='text-xs text-gray-500 font-bold uppercase'>
//                       Phone
//                     </p>
//                     <p className='font-bold text-gray-900'>{service.phone}</p>
//                   </div>
//                 </div>
//               )}
//               {service.email && (
//                 <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
//                   <Mail size={18} className='text-purple-600' />
//                   <div>
//                     <p className='text-xs text-gray-500 font-bold uppercase'>
//                       Email
//                     </p>
//                     <p className='font-bold text-gray-900 truncate'>
//                       {service.email}
//                     </p>
//                   </div>
//                 </div>
//               )}
//               {service.website && (
//                 <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
//                   <Globe size={18} className='text-purple-600' />
//                   <div>
//                     <p className='text-xs text-gray-500 font-bold uppercase'>
//                       Website
//                     </p>
//                     <p className='font-bold text-gray-900 truncate'>
//                       {service.website}
//                     </p>
//                   </div>
//                 </div>
//               )}
//               {service.availability && (
//                 <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
//                   <Clock size={18} className='text-purple-600' />
//                   <div>
//                     <p className='text-xs text-gray-500 font-bold uppercase'>
//                       Availability
//                     </p>
//                     <p className='font-bold text-gray-900'>
//                       {service.availability}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Pricing */}
//             {service.pricing && (
//               <div className='mb-6'>
//                 <h3 className='text-lg font-bold text-gray-900 mb-3'>
//                   Pricing
//                 </h3>
//                 <div className='bg-purple-50 border-2 border-purple-200 rounded-xl p-4'>
//                   <p className='text-xs text-purple-600 font-bold uppercase mb-1'>
//                     Service Cost / Starting From
//                   </p>
//                   <p className='text-3xl font-black text-purple-600'>
//                     {service.pricing}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className='flex gap-3 sticky bottom-0 bg-white pt-4 border-t'>
//               <button className='flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg'>
//                 Book Now
//               </button>
//               <button className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-4 rounded-xl font-bold transition-all'>
//                 Contact Vendor
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// const ExploreVendors = () => {
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [savedServices, setSavedServices] = useState([]);
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedService, setSelectedService] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const SERVICES_PER_PAGE = 20;

//   const categories = [
//     "All",
//     "Catering",
//     "Photography",
//     "Decoration",
//     "DJ",
//     "Makeup",
//   ];

//   // Fetch services from Firestore
//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         const querySnapshot = await getDocs(collection(db, "services"));

//         const servicesList = querySnapshot.docs.map((doc) => {
//           const data = doc.data();

//           return {
//             id: doc.id,
//             // Fallbacks map both standard naming frameworks (e.g., serviceName vs title vs businessName)
//             serviceName:
//               data.serviceName || data.title || data.name || "Untitled Service",
//             vendorName:
//               data.vendorName || data.businessName || "Unknown Vendor",
//             location: data.location || "Location N/A",
//             image: data.image || data.imageUrl || "", // Catches either field variants for your ImgBB string
//             category: data.category || "Other",
//             email: data.email || "",
//             phone: data.phone || "",
//             description: data.description || "",
//             pricing: data.pricing || data.price || "Contact for Price",
//             approved: data.approved || false,
//             rating: data.rating || "N/A",
//             reviews: data.reviews || 0,
//             availability: data.availability || "",
//           };
//         });

//         setServices(servicesList);
//         setCurrentPage(1);
//         console.log("Fetched Services:", servicesList);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//         setServices([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   // Filter combined data over Service details, Vendor names, and Locations
//   const filteredServices = useMemo(() => {
//     return services.filter((service) => {
//       const matchesCategory =
//         selectedCategory === "All" || service.category === selectedCategory;
//       const matchesSearch =
//         service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         service.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         service.location.toLowerCase().includes(searchQuery.toLowerCase());

//       return matchesCategory && matchesSearch;
//     });
//   }, [selectedCategory, searchQuery, services]);

//   // Pagination Configuration
//   const totalPages = Math.ceil(filteredServices.length / SERVICES_PER_PAGE);
//   const startIndex = (currentPage - 1) * SERVICES_PER_PAGE;
//   const paginatedServices = filteredServices.slice(
//     startIndex,
//     startIndex + SERVICES_PER_PAGE
//   );

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (value) => {
//     setSearchQuery(value);
//     setCurrentPage(1);
//   };

//   const toggleSave = (id) => {
//     setSavedServices((prev) =>
//       prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20'>
//       {/* Detail Overlay View */}
//       <ServiceProfileOverlay
//         service={selectedService}
//         isOpen={!!selectedService}
//         onClose={() => setSelectedService(null)}
//       />

//       <div className='absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-linear-to-b from-purple-100/50 to-transparent blur-[100px] pointer-events-none -z-10' />

//       <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
//         {loading && (
//           <div className='flex flex-col items-center justify-center py-20'>
//             <div className='w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin' />
//             <p className='mt-4 text-gray-600 font-medium'>
//               Loading services...
//             </p>
//           </div>
//         )}

//         {!loading && (
//           <>
//             {/* Control Interface Bar */}
//             <div className='sticky top-4 z-30 mb-10'>
//               <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className='bg-white/80 backdrop-blur-xl p-4 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white flex flex-col xl:flex-row items-center gap-4'
//               >
//                 {/* Global Search Bar */}
//                 <div className='relative w-full xl:w-fit shrink-0 group'>
//                   <Search
//                     className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
//                     size={20}
//                   />
//                   <input
//                     type='text'
//                     placeholder='Search services, vendors, or locations...'
//                     value={searchQuery}
//                     onChange={(e) => handleSearchChange(e.target.value)}
//                     className='w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-full py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-sm font-medium placeholder:text-gray-400'
//                   />
//                 </div>

//                 <div className='hidden xl:block w-px h-8 bg-gray-200 mx-2' />

//                 {/* Categories */}
//                 <div className='flex items-center gap-2 overflow-x-auto w-full pb-2 xl:pb-0 scrollbar-hide'>
//                   {categories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => handleCategoryChange(category)}
//                       className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
//                         selectedCategory === category
//                           ? "bg-gray-900 text-white shadow-md shadow-gray-200"
//                           : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900"
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   ))}

//                   <button className='ml-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 text-sm font-bold transition-colors'>
//                     <SlidersHorizontal size={16} />
//                     More Filters
//                   </button>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Pagination Metrics */}
//             <div className='mb-6 text-sm text-gray-600 font-medium'>
//               Showing {filteredServices.length === 0 ? 0 : startIndex + 1} -{" "}
//               {Math.min(
//                 startIndex + SERVICES_PER_PAGE,
//                 filteredServices.length
//               )}{" "}
//               of {filteredServices.length} services
//             </div>

//             {/* Main Content Render Grid */}
//             {filteredServices.length === 0 ? (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className='flex flex-col items-center justify-center py-20 text-center'
//               >
//                 <div className='w-24 h-24 bg-gray-50 rounded-4xl flex items-center justify-center mb-6'>
//                   <Search size={40} className='text-gray-300' />
//                 </div>
//                 <h3 className='text-2xl font-black text-gray-900 mb-2'>
//                   No services found
//                 </h3>
//                 <p className='text-gray-500 font-medium max-w-sm'>
//                   We couldn't find matches for "{searchQuery}" under{" "}
//                   {selectedCategory}. Try shifting parameters.
//                 </p>
//                 <button
//                   onClick={() => {
//                     handleSearchChange("");
//                     handleCategoryChange("All");
//                   }}
//                   className='mt-6 text-purple-600 font-bold hover:underline underline-offset-4'
//                 >
//                   Clear all filters
//                 </button>
//               </motion.div>
//             ) : (
//               <>
//                 <motion.section
//                   layout
//                   className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'
//                 >
//                   <AnimatePresence mode='popLayout'>
//                     {paginatedServices.map((service) => (
//                       <motion.div
//                         layout
//                         initial={{ opacity: 0, scale: 0.9 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.9 }}
//                         transition={{ duration: 0.3 }}
//                         key={service.id}
//                         className='group bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-100/40 border border-gray-100 transition-all duration-500 flex flex-col h-full'
//                       >
//                         {/* ImgBB Card Preview Image Wrapper */}
//                         <div
//                           onClick={() => setSelectedService(service)}
//                           className='relative h-60 overflow-hidden cursor-pointer'
//                         >
//                           {service.image ? (
//                             <img
//                               src={service.image}
//                               alt={service.serviceName}
//                               className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
//                             />
//                           ) : (
//                             <div className='w-full h-full bg-purple-50 flex items-center justify-center text-purple-300 transition-transform duration-700 group-hover:scale-105'>
//                               <Briefcase size={48} />
//                             </div>
//                           )}

//                           {/* Category Tag */}
//                           <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm text-gray-900 uppercase'>
//                             {service.category}
//                           </div>

//                           {/* Bookmark Button */}
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               toggleSave(service.id);
//                             }}
//                             className='absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-pink-500 hover:scale-110 transition-all shadow-sm z-10'
//                           >
//                             <Heart
//                               size={18}
//                               className={`transition-colors ${
//                                 savedServices.includes(service.id)
//                                   ? "fill-pink-500 text-pink-500"
//                                   : "hover:fill-pink-500"
//                               }`}
//                             />
//                           </button>

//                           {/* Linear Overlay Gradient */}
//                           <div className='absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-gray-900/80 to-transparent pointer-events-none' />
//                           <div className='absolute bottom-4 left-4 flex items-center gap-2'>
//                             <div className='flex items-center gap-1 bg-white text-gray-900 px-2 py-1 rounded-lg text-sm font-bold shadow-sm'>
//                               <Star
//                                 size={14}
//                                 className='fill-yellow-400 text-yellow-400'
//                               />
//                               {service.rating || "N/A"}
//                             </div>
//                             <span className='text-white text-xs font-medium drop-shadow-md'>
//                               ({service.reviews || 0} reviews)
//                             </span>
//                           </div>
//                         </div>

//                         {/* Text Metrics Content Block */}
//                         <div className='p-6 flex flex-col flex-1'>
//                           <span className='text-xs font-bold text-purple-600 uppercase tracking-wider mb-1'>
//                             {service.vendorName}
//                           </span>

//                           <h3
//                             onClick={() => setSelectedService(service)}
//                             className='text-2xl font-black text-gray-900 mb-2 group-hover:text-purple-600 transition-colors cursor-pointer line-clamp-1'
//                           >
//                             {service.serviceName}
//                           </h3>

//                           <div className='flex items-center gap-1.5 text-gray-500 text-sm font-medium mb-6'>
//                             <MapPin size={16} className='text-gray-400' />
//                             {service.location}
//                           </div>

//                           {/* Base Pricing Context Row */}
//                           <div className='mt-auto pt-6 border-t border-gray-100 flex items-center justify-between'>
//                             <div>
//                               <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1'>
//                                 Starting From
//                               </p>
//                               <h4 className='text-xl font-black text-gray-900'>
//                                 {service.pricing}
//                               </h4>
//                             </div>

//                             <button
//                               onClick={() => setSelectedService(service)}
//                               className='bg-gray-900 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5'
//                             >
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>
//                 </motion.section>

//                 {/* Pagination Controls Footer navigation */}
//                 {totalPages > 1 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className='flex items-center justify-center gap-4 mt-12'
//                   >
//                     <button
//                       onClick={() =>
//                         setCurrentPage(Math.max(1, currentPage - 1))
//                       }
//                       disabled={currentPage === 1}
//                       className='flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold'
//                     >
//                       <ChevronLeft size={18} />
//                       Previous
//                     </button>

//                     <div className='flex items-center gap-2'>
//                       {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                         (page) => (
//                           <button
//                             key={page}
//                             onClick={() => setCurrentPage(page)}
//                             className={`w-10 h-10 rounded-lg font-bold transition-all ${
//                               currentPage === page
//                                 ? "bg-purple-600 text-white shadow-lg"
//                                 : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
//                             }`}
//                           >
//                             {page}
//                           </button>
//                         )
//                       )}
//                     </div>

//                     <button
//                       onClick={() =>
//                         setCurrentPage(Math.min(totalPages, currentPage + 1))
//                       }
//                       disabled={currentPage === totalPages}
//                       className='flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold'
//                     >
//                       Next
//                       <ChevronRight size={18} />
//                     </button>
//                   </motion.div>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default ExploreVendors;

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Star,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Globe,
  Clock,
  Briefcase,
  MessageSquare,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Helper to handle contacting vendor via WhatsApp or Email
const handleContactVendor = (service) => {
  const phone = service.phone || service.vendorPhone;
  if (phone) {
    const cleanPhone = String(phone).replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Hello! I found your service "${service.serviceName}" on the platform and would like to inquire about booking.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
  } else if (service.email) {
    window.open(
      `mailto:${service.email}?subject=Inquiry regarding ${service.serviceName}`,
      "_blank"
    );
  } else {
    alert("Vendor has not provided contact details yet.");
  }
};

// Service Detail Overlay Component
const ServiceProfileOverlay = ({ service, isOpen, onClose }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  if (!isOpen || !service) return null;

  const handleBook = async () => {
    try {
      if (!auth || !auth.currentUser) {
        alert("Please sign in to book this service.");
        return;
      }

      setIsBooking(true);

      const currentUser = auth.currentUser;
      let clientName = currentUser.displayName || currentUser.email || "Client";
      let clientPhone = currentUser.phoneNumber || "";

      // Fetch user profile info from Firestore for consistency with Dashboard
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const uData = userDoc.data();
          clientName = uData.fullName || uData.name || clientName;
          clientPhone = uData.phoneNumber || uData.phone || clientPhone;
        }
      } catch (err) {
        console.warn("Could not fetch extra user profile info:", err);
      }

      // Extract numeric or string price for consistency
      const rawPrice = service.pricing || service.price || 0;

      // Write complete booking record aligned with Dashboard & My Bookings schema
      await addDoc(collection(db, "bookings"), {
        // Client Information
        clientId: currentUser.uid,
        clientName: clientName,
        clientEmail: currentUser.email || "",
        clientPhone: clientPhone,

        // Vendor Information
        vendorId: service.vendorId || service.uid || "unknown_vendor",
        vendorName: service.vendorName || "Unknown Vendor",
        vendorEmail: service.email || service.vendorEmail || "",
        vendorPhone: service.phone || service.vendorPhone || "",
        vendorImage: service.image || "",

        // Service & Pricing Information
        serviceId: service.id || null,
        service: service.serviceName || service.category || "Service",
        serviceCategory: service.category || "General",
        totalPrice: rawPrice,
        location: service.location || "Nigeria",
        date: "To be confirmed via chat",

        // Status & Timestamps
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setBookingSuccess(true);
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to submit booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const handleModalClose = () => {
    setBookingSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleModalClose}
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className='bg-white rounded-4xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl'
        >
          {/* Close Button */}
          <button
            onClick={handleModalClose}
            className='absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer'
          >
            <X size={24} className='text-gray-600' />
          </button>

          {/* Header Image */}
          <div className='relative h-80 overflow-hidden'>
            {service.image ? (
              <img
                src={service.image}
                alt={service.serviceName}
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-purple-50 flex items-center justify-center text-purple-300'>
                <Briefcase size={64} />
              </div>
            )}
            <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent' />
            <div className='absolute bottom-4 left-6 flex items-center gap-2'>
              <div className='flex items-center gap-1 bg-white text-gray-900 px-3 py-1.5 rounded-lg font-bold shadow-sm text-sm'>
                <Star size={16} className='fill-yellow-400 text-yellow-400' />
                {service.rating > 0 ? service.rating : "0"}
              </div>
              <span className='text-white text-sm font-medium drop-shadow-md'>
                ({service.reviews || 0} reviews)
              </span>
            </div>
          </div>

          {/* Content */}
          <div className='p-8'>
            {/* Title & Vendor / Category */}
            <div className='mb-6'>
              <div className='flex gap-2 mb-3'>
                <span className='bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase'>
                  {service.category}
                </span>
                <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold'>
                  By: {service.vendorName}
                </span>
              </div>
              <h1 className='text-4xl font-black text-gray-900 mb-2'>
                {service.serviceName}
              </h1>
              <div className='flex items-center gap-2 text-gray-600'>
                <MapPin size={18} />
                <span className='font-medium'>{service.location}</span>
              </div>
            </div>

            {/* Description */}
            {service.description && (
              <div className='mb-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>
                  About Service
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  {service.description}
                </p>
              </div>
            )}

            {/* Contact Information */}
            <div className='mb-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {service.phone && (
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <Phone size={18} className='text-purple-600' />
                  <div>
                    <p className='text-xs text-gray-500 font-bold uppercase'>
                      Phone
                    </p>
                    <p className='font-bold text-gray-900'>{service.phone}</p>
                  </div>
                </div>
              )}
              {service.email && (
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <Mail size={18} className='text-purple-600' />
                  <div>
                    <p className='text-xs text-gray-500 font-bold uppercase'>
                      Email
                    </p>
                    <p className='font-bold text-gray-900 truncate'>
                      {service.email}
                    </p>
                  </div>
                </div>
              )}
              {service.website && (
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <Globe size={18} className='text-purple-600' />
                  <div>
                    <p className='text-xs text-gray-500 font-bold uppercase'>
                      Website
                    </p>
                    <p className='font-bold text-gray-900 truncate'>
                      {service.website}
                    </p>
                  </div>
                </div>
              )}
              {service.availability && (
                <div className='flex items-center gap-3 p-4 bg-gray-50 rounded-xl'>
                  <Clock size={18} className='text-purple-600' />
                  <div>
                    <p className='text-xs text-gray-500 font-bold uppercase'>
                      Availability
                    </p>
                    <p className='font-bold text-gray-900'>
                      {service.availability}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing */}
            {service.pricing && (
              <div className='mb-6'>
                <h3 className='text-lg font-bold text-gray-900 mb-3'>
                  Pricing
                </h3>
                <div className='bg-purple-50 border-2 border-purple-200 rounded-xl p-4'>
                  <p className='text-xs text-purple-600 font-bold uppercase mb-1'>
                    Service Cost / Starting From
                  </p>
                  <p className='text-3xl font-black text-purple-600'>
                    {service.pricing}
                  </p>
                </div>
              </div>
            )}

            {/* Success Feedback Alert */}
            {bookingSuccess && (
              <div className='mb-6 p-4 rounded-2xl bg-green-50 border border-green-200 text-green-700 flex items-center gap-3'>
                <CheckCircle2 size={24} className='shrink-0' />
                <div className='text-sm'>
                  <p className='font-bold'>Service successfully booked!</p>
                  <p className='text-xs opacity-90'>
                    Check your "My Bookings" page to track its status.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex gap-3 sticky bottom-0 bg-white pt-4 border-t'>
              <button
                disabled={isBooking || bookingSuccess}
                onClick={handleBook}
                className='flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer'
              >
                {isBooking ? (
                  <>
                    <Loader2 size={20} className='animate-spin' />
                    Processing...
                  </>
                ) : bookingSuccess ? (
                  "Booked Successfully ✓"
                ) : (
                  "Book Service Now"
                )}
              </button>

              <button
                onClick={() => handleContactVendor(service)}
                className='flex-1 bg-green-50 hover:bg-green-100 text-green-700 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer'
              >
                <MessageSquare size={18} />
                Contact Vendor
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ExploreVendors = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const SERVICES_PER_PAGE = 20;

  const categories = [
    "All",
    "Catering",
    "Photography",
    "Decoration",
    "DJ",
    "Makeup",
  ];

  // Fetch services, vendor details, and calculate dynamic ratings from reviews
  useEffect(() => {
    const fetchServicesAndVendors = async () => {
      try {
        setLoading(true);

        const [servicesSnapshot, vendorsSnapshot, reviewsSnapshot] =
          await Promise.all([
            getDocs(collection(db, "services")),
            getDocs(collection(db, "vendors")),
            getDocs(collection(db, "reviews")),
          ]);

        // Map vendor profiles
        const vendorsMap = {};
        vendorsSnapshot.docs.forEach((doc) => {
          const vData = doc.data();
          vendorsMap[doc.id] = {
            name: vData.businessName || vData.name || "Unknown Vendor",
            location:
              vData.location || vData.city || vData.state || "Location N/A",
            phone: vData.phoneNumber || vData.phone || "",
            email: vData.email || "",
          };
        });

        // Compute dynamic reviews and average rating per vendor / service
        const ratingsMap = {};
        reviewsSnapshot.docs.forEach((doc) => {
          const rev = doc.data();
          const targetId = rev.vendorId || rev.serviceId;
          if (targetId) {
            if (!ratingsMap[targetId]) {
              ratingsMap[targetId] = { total: 0, count: 0 };
            }
            ratingsMap[targetId].total += Number(rev.rating) || 0;
            ratingsMap[targetId].count += 1;
          }
        });

        const servicesList = servicesSnapshot.docs.map((doc) => {
          const data = doc.data();
          const assignedVendorId =
            data.vendorId || data.uid || data.vendorRef || "";

          const vendorMeta = vendorsMap[assignedVendorId] || {
            name: "Unknown Vendor",
            location: "Location N/A",
            phone: "",
            email: "",
          };

          // Calculate dynamic rating (vendor level or service level)
          const ratingData = ratingsMap[assignedVendorId] || ratingsMap[doc.id];
          const calculatedAvg =
            ratingData && ratingData.count > 0
              ? (ratingData.total / ratingData.count).toFixed(1)
              : 0;
          const reviewCount = ratingData ? ratingData.count : 0;

          return {
            vendorId: assignedVendorId,
            id: doc.id,
            serviceName:
              data.serviceName || data.title || data.name || "Untitled Service",
            vendorName: vendorMeta.name,
            location:
              data.location && data.location !== "Location N/A"
                ? data.location
                : vendorMeta.location,
            image: data.image || data.imageUrl || "",
            category: data.category || "Other",
            email: data.email || vendorMeta.email || "",
            phone: data.phone || vendorMeta.phone || "",
            description: data.description || "",
            pricing: data.pricing || data.price || "Contact for Price",
            approved: data.approved || false,
            rating: calculatedAvg,
            reviews: reviewCount,
            availability: data.availability || "",
          };
        });

        setServices(servicesList);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error cross-fetching data models:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesAndVendors();
  }, []);

  // Filter combined data
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesCategory =
        selectedCategory === "All" || service.category === selectedCategory;
      const matchesSearch =
        service.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, services]);

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / SERVICES_PER_PAGE);
  const startIndex = (currentPage - 1) * SERVICES_PER_PAGE;
  const paginatedServices = filteredServices.slice(
    startIndex,
    startIndex + SERVICES_PER_PAGE
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className='min-h-screen bg-[#fafafa] font-sans text-gray-900 pb-20'>
      {/* Detail Overlay View */}
      <ServiceProfileOverlay
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />

      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-gradient-to-b from-purple-100/50 to-transparent blur-[100px] pointer-events-none -z-10' />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
        {loading && (
          <div className='flex flex-col items-center justify-center py-20'>
            <div className='w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin' />
            <p className='mt-4 text-gray-600 font-medium'>
              Loading services...
            </p>
          </div>
        )}

        {!loading && (
          <>
            {/* Control Interface Bar */}
            <div className='sticky top-4 z-30 mb-10'>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='bg-white/80 backdrop-blur-xl p-4 rounded-4xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white flex flex-col xl:flex-row items-center gap-4'
              >
                {/* Global Search Bar */}
                <div className='relative w-full xl:w-fit shrink-0 group'>
                  <Search
                    className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors'
                    size={20}
                  />
                  <input
                    type='text'
                    placeholder='Search services, vendors, or locations...'
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className='w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-full py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-100 focus:bg-white transition-all text-sm font-medium placeholder:text-gray-400'
                  />
                </div>

                <div className='hidden xl:block w-px h-8 bg-gray-200 mx-2' />

                {/* Categories */}
                <div className='flex items-center gap-2 overflow-x-auto w-full pb-2 xl:pb-0 scrollbar-hide'>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                        selectedCategory === category
                          ? "bg-gray-900 text-white shadow-md shadow-gray-200"
                          : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {category}
                    </button>
                  ))}

                  <button className='ml-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 text-sm font-bold transition-colors cursor-pointer'>
                    <SlidersHorizontal size={16} />
                    More Filters
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Pagination Metrics */}
            <div className='mb-6 text-sm text-gray-600 font-medium'>
              Showing {filteredServices.length === 0 ? 0 : startIndex + 1} -{" "}
              {Math.min(
                startIndex + SERVICES_PER_PAGE,
                filteredServices.length
              )}{" "}
              of {filteredServices.length} services
            </div>

            {/* Main Content Render Grid */}
            {filteredServices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex flex-col items-center justify-center py-20 text-center'
              >
                <div className='w-24 h-24 bg-gray-50 rounded-4xl flex items-center justify-center mb-6'>
                  <Search size={40} className='text-gray-300' />
                </div>
                <h3 className='text-2xl font-black text-gray-900 mb-2'>
                  No services found
                </h3>
                <p className='text-gray-500 font-medium max-w-sm'>
                  We couldn't find matches for "{searchQuery}" under{" "}
                  {selectedCategory}. Try shifting parameters.
                </p>
                <button
                  onClick={() => {
                    handleSearchChange("");
                    handleCategoryChange("All");
                  }}
                  className='mt-6 text-purple-600 font-bold hover:underline underline-offset-4 cursor-pointer'
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <>
                <motion.section
                  layout
                  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'
                >
                  <AnimatePresence mode='popLayout'>
                    {paginatedServices.map((service) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={service.id}
                        className='group bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-100/40 border border-gray-100 transition-all duration-500 flex flex-col h-full'
                      >
                        {/* Card Image Wrapper */}
                        <div
                          onClick={() => setSelectedService(service)}
                          className='relative h-60 overflow-hidden cursor-pointer'
                        >
                          {service.image ? (
                            <img
                              src={service.image}
                              alt={service.serviceName}
                              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                            />
                          ) : (
                            <div className='w-full h-full bg-purple-50 flex items-center justify-center text-purple-300 transition-transform duration-700 group-hover:scale-105'>
                              <Briefcase size={48} />
                            </div>
                          )}

                          {/* Category Tag */}
                          <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-sm text-gray-900 uppercase'>
                            {service.category}
                          </div>

                          {/* Rating Overlay */}
                          <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none' />
                          <div className='absolute bottom-4 left-4 flex items-center gap-2'>
                            <div className='flex items-center gap-1 bg-white text-gray-900 px-2 py-1 rounded-lg text-sm font-bold shadow-sm'>
                              <Star
                                size={14}
                                className='fill-yellow-400 text-yellow-400'
                              />
                              {service.rating > 0 ? service.rating : "0"}
                            </div>
                            <span className='text-white text-xs font-medium drop-shadow-md'>
                              ({service.reviews || 0} reviews)
                            </span>
                          </div>
                        </div>

                        {/* Content Block */}
                        <div className='p-6 flex flex-col flex-1'>
                          <span className='text-xs font-bold text-purple-600 uppercase tracking-wider mb-1'>
                            {service.vendorName}
                          </span>

                          <h3
                            onClick={() => setSelectedService(service)}
                            className='text-2xl font-black text-gray-900 mb-2 group-hover:text-purple-600 transition-colors cursor-pointer line-clamp-1'
                          >
                            {service.serviceName}
                          </h3>

                          <div className='flex items-center gap-1.5 text-gray-500 text-sm font-medium mb-6'>
                            <MapPin size={16} className='text-gray-400' />
                            {service.location}
                          </div>

                          {/* Pricing & Detail Action */}
                          <div className='mt-auto pt-6 border-t border-gray-100 flex items-center justify-between'>
                            <div>
                              <p className='text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1'>
                                Starting From
                              </p>
                              <h4 className='text-xl font-black text-gray-900'>
                                {service.pricing}
                              </h4>
                            </div>

                            <button
                              onClick={() => setSelectedService(service)}
                              className='bg-gray-900 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl text-sm font-bold transition-all hover:shadow-lg hover:shadow-purple-200 hover:-translate-y-0.5 cursor-pointer'
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.section>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex items-center justify-center gap-4 mt-12'
                  >
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className='flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold cursor-pointer'
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </button>

                    <div className='flex items-center gap-2'>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-bold transition-all cursor-pointer ${
                              currentPage === page
                                ? "bg-purple-600 text-white shadow-lg"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>

                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className='flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold cursor-pointer'
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ExploreVendors;
