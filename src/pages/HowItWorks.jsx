import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import HowItWorks from "../components/HowItWorks";

const HowItWorksPage = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Back Button */}
      <div className='pt-6 px-6'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group'
        >
          <ArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200' />
          <span className='font-medium'>Back to Home</span>
        </Link>
      </div>

      {/* How It Works Component */}
      <HowItWorks />
    </div>
  );
};

export default HowItWorksPage;
