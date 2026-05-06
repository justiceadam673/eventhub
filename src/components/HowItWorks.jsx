import React from "react";
import { motion } from "framer-motion";
import { Search, CalendarCheck, Sparkles, ChevronRight } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Search",
    description:
      "Browse through thousands of verified vendors based on your specific event needs and budget.",
    icon: <Search className='text-purple-600' size={30} />,
    color: "bg-purple-50",
  },
  {
    id: 2,
    title: "Book",
    description:
      "Directly communicate with vendors, compare quotes, and secure your date with one click.",
    icon: <CalendarCheck className='text-pink-600' size={30} />,
    color: "bg-pink-50",
  },
  {
    id: 3,
    title: "Celebrate",
    description:
      "Show up to your event and enjoy! Our vendors handle the details so you can make memories.",
    icon: <Sparkles className='text-orange-600' size={30} />,
    color: "bg-orange-50",
  },
];

const HowItWorks = () => {
  return (
    <section className='py-24 px-6 relative overflow-hidden bg-white'>
      {/* Background Decorative Element */}
      <div className='absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-50 to-transparent -translate-y-1/2 hidden lg:block' />

      <div className='max-w-7xl mx-auto relative z-10'>
        <div className='text-center mb-20'>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className='text-purple-600 font-bold tracking-widest uppercase text-sm'
          >
            The Process
          </motion.span>
          <h2 className='text-4xl md:text-5xl font-black text-gray-900 mt-3'>
            Your event, planned in{" "}
            <span className='text-purple-600'>3 simple steps</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16'>
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className='relative group text-center'
            >
              {/* Step Number Badge */}
              <div className='mb-8 relative inline-block'>
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center mx-auto shadow-sm group-hover:shadow-xl group-hover:shadow-purple-100 transition-all duration-500`}
                >
                  {step.icon}
                </motion.div>

                <div className='absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center border-4 border-white'>
                  0{step.id}
                </div>
              </div>

              {/* Text Content */}
              <h3 className='text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors'>
                {step.title}
              </h3>
              <p className='text-gray-500 leading-relaxed px-4'>
                {step.description}
              </p>

              {/* Arrow Connector for Desktop */}
              {index < 2 && (
                <div className='hidden lg:block absolute top-10 -right-8 text-purple-100'>
                  <ChevronRight size={40} strokeWidth={1} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='mt-20 text-center'
        >
          <button className='bg-gray-900 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-purple-600 transition-all hover:scale-105 active:scale-95'>
            Start Planning Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
