import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  ArrowRight,
  ArrowLeft,
  Star,
  Sparkles,
  Search,
  ChevronRight,
  Zap,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { services, testimonials } from "../data/services";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAuthenticated] = useState(false); // In real app, get from auth context

  // Get unique categories
  const categories = ["All", ...new Set(services.map((s) => s.category))];

  // Filter services based on search and category
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className='bg-linear-to-b from-gray-50 via-white to-gray-50 min-h-screen'>
      {/* Header Section */}
      <section className='relative pt-32 pb-20 px-6 overflow-hidden'>
        {/* Back to Home Button */}
        <Link
          to='/'
          className='absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all duration-300 text-gray-700 hover:text-gray-900'
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
        {/* Decorative blobs */}
        <div className='absolute top-10 left-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl -z-10' />
        <div className='absolute bottom-0 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10' />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='max-w-5xl mx-auto text-center'
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className='inline-flex items-center gap-2 bg-purple-100/80 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-purple-200'
          >
            <Sparkles size={16} className='text-purple-600' />
            <span className='text-sm font-semibold text-purple-700'>
              Discover Premium Services
            </span>
          </motion.div>

          <h1 className='text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight'>
            Everything You Need for{" "}
            <span className='bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent'>
              Unforgettable Events
            </span>
          </h1>

          <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
            Explore our curated collection of premium vendors and services. Sign
            up to book your favorites and bring your dream event to life.
          </p>

          {!isAuthenticated && (
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                to='/auth/signup'
                className='group px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2'
              >
                Get Started
                <ArrowRight
                  size={20}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </Link>
              <Link
                to='/auth/signin'
                className='px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-full hover:border-purple-600 hover:text-purple-600 transition-all duration-300'
              >
                Sign In
              </Link>
            </div>
          )}
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className='px-6 py-12 max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            { icon: Users, label: "10K+ Happy Clients", value: "98%" },
            { icon: Shield, label: "Verified Vendors", value: "500+" },
            { icon: Zap, label: "Quick Booking", value: "24hrs" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className='group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300'
            >
              <div className='absolute inset-0 bg-linear-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300' />
              <div className='relative z-10'>
                <div className='w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4'>
                  <stat.icon size={24} className='text-white' />
                </div>
                <p className='text-gray-600 font-semibold mb-1'>{stat.label}</p>
                <p className='text-3xl font-black text-gray-900'>
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className='px-6 py-12 max-w-7xl mx-auto'>
        <div className='space-y-6'>
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='relative'
          >
            <div className='relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
              <Search
                size={24}
                className='absolute left-6 top-1/2 -translate-y-1/2 text-gray-400'
              />
              <input
                type='text'
                placeholder='Search services...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-16 pr-6 py-4 text-lg bg-transparent outline-none text-gray-900 placeholder-gray-400'
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className='flex flex-wrap gap-3'
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ y: -2 }}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className='px-6 py-12 max-w-7xl mx-auto'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className='group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-500 h-full'
            >
              {/* Image Container */}
              <div className='relative h-64 overflow-hidden bg-gray-200'>
                <motion.img
                  src={service.image}
                  alt={service.name}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />

                {/* Overlay with Lock (if not authenticated) */}
                {!isAuthenticated && (
                  <div className='absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='text-center'>
                      <Lock size={48} className='text-white mx-auto mb-3' />
                      <p className='text-white font-bold text-sm'>
                        Sign up to view
                      </p>
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className='absolute top-4 left-4'>
                  <span className='bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>
                    {service.category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className='absolute top-4 right-4'>
                  <span className='inline-flex items-center gap-1 bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm'>
                    <Star
                      size={14}
                      fill='currentColor'
                      className='text-yellow-400'
                    />
                    4.8
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className='p-6 flex flex-col h-full'>
                <div className='mb-4'>
                  <div className='text-3xl mb-3'>{service.icon}</div>
                  <h3 className='text-xl font-bold text-gray-900 mb-2'>
                    {service.name}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className='mt-auto mb-6'>
                  <div className='space-y-2'>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className='flex items-center gap-2'>
                        <div className='w-2 h-2 bg-linear-to-r from-purple-600 to-pink-600 rounded-full' />
                        <span className='text-sm text-gray-600'>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                {isAuthenticated ? (
                  <Link
                    to={`/services/${service.id}`}
                    className='w-full py-3 px-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 group/btn'
                  >
                    View Details
                    <ChevronRight
                      size={18}
                      className='group-hover/btn:translate-x-1 transition-transform'
                    />
                  </Link>
                ) : (
                  <Link
                    to='/auth/signup'
                    className='w-full py-3 px-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2'
                  >
                    <Lock size={18} />
                    Sign up to View
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No results message */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center py-20'
          >
            <p className='text-xl text-gray-600 font-semibold mb-2'>
              No services found
            </p>
            <p className='text-gray-500'>Try adjusting your search terms</p>
          </motion.div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className='px-6 py-24 max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <span className='text-purple-600 font-bold tracking-widest uppercase text-sm'>
            Success Stories
          </span>
          <h2 className='text-4xl font-black text-gray-900 mt-2'>
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          className='grid grid-cols-1 md:grid-cols-3 gap-8'
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className='bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300'
            >
              {/* Stars */}
              <div className='flex gap-1 mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill='currentColor'
                    className='text-yellow-400'
                  />
                ))}
              </div>

              <p className='text-gray-700 mb-6 text-lg leading-relaxed'>
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className='flex items-center gap-4'>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className='w-12 h-12 rounded-full'
                />
                <div>
                  <p className='font-bold text-gray-900'>{testimonial.name}</p>
                  <p className='text-sm text-gray-600'>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className='relative px-6 py-24 overflow-hidden'>
          {/* Decorative elements */}
          <div className='absolute inset-0 bg-linear-to-r from-purple-600/10 via-pink-600/10 to-blue-600/10 -z-10' />
          <div className='absolute top-0 right-0 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl -z-10' />
          <div className='absolute bottom-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl -z-10' />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='max-w-4xl mx-auto text-center'
          >
            <h2 className='text-4xl md:text-5xl font-black text-gray-900 mb-6'>
              Ready to Plan Your Perfect Event?
            </h2>
            <p className='text-xl text-gray-600 mb-8'>
              Join thousands of satisfied customers who trust EventHub for their
              special moments. Get exclusive access to vetted vendors and
              premium services.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link
                to='/auth/signup'
                className='group px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2'
              >
                Sign Up Now
                <ArrowRight
                  size={20}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </Link>
              <Link
                to='/auth/signin'
                className='px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-full hover:border-purple-600 hover:text-purple-600 transition-all duration-300'
              >
                Already have an account?
              </Link>
            </div>
          </motion.div>
        </section>
      )}

      {/* Info Cards Section */}
      <section className='px-6 py-24 max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-black text-gray-900 mt-2'>
            Why Choose{" "}
            <span className='text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600'>
              EventHub
            </span>
            ?
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: "-100px" }}
          className='grid grid-cols-1 md:grid-cols-2 gap-8'
        >
          {[
            {
              title: "Vetted Professionals",
              description:
                "All vendors are thoroughly verified and rated by real clients",
              icon: Shield,
            },
            {
              title: "Easy Booking",
              description:
                "Simple, transparent booking process with instant confirmation",
              icon: Zap,
            },
            {
              title: "Best Prices",
              description:
                "Competitive pricing with no hidden fees or surprises",
              icon: Star,
            },
            {
              title: "24/7 Support",
              description:
                "Dedicated support team available whenever you need help",
              icon: Users,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group'
            >
              <div className='w-16 h-16 bg-linear-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <item.icon
                  size={32}
                  className='text-gradient-to-r from-purple-600 to-pink-600'
                />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>
                {item.title}
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Explore;
