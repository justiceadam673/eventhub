import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarHeart,
  MessageSquare,
  Search,
  Bell,
  Heart,
  Star,
  ShieldCheck,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { auth, db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  limit,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  // const [featuredVendors, setFeaturedVendors] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    // const vendorsQuery = query(
    //   collection(db, "vendors"),
    //   orderBy("createdAt", "desc"),
    //   limit(3)
    // );
    const servicesQuery = query(
      collection(db, "services"),
      orderBy("createdAt", "desc")
    );

    // const vendorsUnsub = onSnapshot(
    //   vendorsQuery,
    //   (snapshot) => {
    //     const fetchedVendors = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setFeaturedVendors(fetchedVendors);
    //   },
    //   (err) => {
    //     console.error("Error loading featured vendors:", err);
    //   }
    // );
    const servicesUnsub = onSnapshot(servicesQuery, (snapshot) => {
      const fetchedServices = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFeaturedServices(fetchedServices);
    });

    return () => {
      bookingsUnsub();
      // vendorsUnsub();
      servicesUnsub();
    };
  }, [user]);

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
      icon: <Heart size={24} />,
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

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#fafafa]'>
        <p className='text-gray-500 font-semibold'>Loading your dashboard...</p>
      </div>
    );
  }

  const serviceCards = featuredServices.map((service, index) => ({
    id: service.id,
    name: service.name || "Untitled Service",
    category: service.category || "Service",
    rating: service.rating || 5,
    reviews: service.bookings || 0,
    price: `₦${Number(service.price || 0).toLocaleString()}`,
    location: service.location || "Nigeria",
    image:
      service.image ||
      [
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600",
      ][index % 3],
  }));

  return (
    <div className='min-h-screen bg-[#fafafa] flex font-sans selection:bg-purple-200'>
      {/* Main Content - Offset for sidebar */}
      <main className='flex-1  p-6 md:p-10 relative overflow-hidden'>
        {/* Decorative background blobs */}
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
            <button className='text-purple-600 font-bold hover:text-purple-700 flex items-center gap-1 group'>
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

                  {/* Badges */}
                  <div className='absolute top-4 left-4 flex gap-2'>
                    <span className='bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1'>
                      <ShieldCheck size={12} className='text-purple-600' />
                      Verified
                    </span>
                  </div>
                  <button className='absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-pink-500 hover:scale-110 transition-all shadow-sm'>
                    <Heart
                      size={16}
                      className='hover:fill-pink-500 transition-colors'
                    />
                  </button>

                  {/* Rating Gradient */}
                  <div className='absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-4 left-4 flex items-center gap-2 text-white'>
                    <div className='flex items-center gap-1 bg-purple-600 px-2 py-1 rounded-lg text-xs font-bold'>
                      <Star size={12} className='fill-white' />
                      {service.rating}
                    </div>
                    <span className='text-xs font-medium text-gray-200'>
                      ({service.reviews})
                    </span>
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
                    <button className='flex-1 bg-gray-900 hover:bg-purple-600 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors'>
                      View Profile
                    </button>
                    <button className='p-3.5 bg-purple-50 text-purple-600 rounded-2xl hover:bg-purple-100 transition-colors'>
                      <MessageSquare size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
