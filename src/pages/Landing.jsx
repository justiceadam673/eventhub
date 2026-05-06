import Navbar from "../components/Navber";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedVendors from "../components/FeaturedVendors";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className='bg-gray-50'>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedVendors />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
