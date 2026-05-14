import React from "react";
// import HomePage from "./pages/clients/HomePage";
import Landing from "./pages/Landing";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import ClientDashboard from "./pages/clients/Dashboard";
import Vendors from "./pages/clients/Vendors";
import Booking from "./pages/clients/Booking";
import Messages from "./pages/clients/Messages";
import Profile from "./pages/clients/Profile";
import Explore from "./pages/Explore";
import LandingPageVendor from "./pages/LandingPageVendor";
import HowItWorksPage from "./pages/HowItWorks";
import VendorDashboard from "./pages/vendors/Dashboard";
import VendorLayout from "./pages/VendorsLayout";
import VendorBookings from "./pages/vendors/VendorBookings";
import Services from "./pages/vendors/Services";
import Layout from "./pages/Layout";
import VendorMessages from "./pages/vendors/VendorMessages";
import VendorEarnings from "./pages/vendors/VendorEarning";
import VendorProfile from "./pages/vendors/VendorProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/HowItWorks' element={<HowItWorksPage />} />
          <Route path='/landingPageVendor' element={<LandingPageVendor />} />

          {/* Client Routes with Layout */}
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<ClientDashboard />} />
            <Route path='/vendors' element={<Vendors />} />
            <Route path='/bookings' element={<Booking />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          {/* Vendor Routes with Layout */}
          <Route element={<VendorLayout />}>
            <Route path='/vendor/dashboard' element={<VendorDashboard />} />
            <Route path='/vendor/bookings' element={<VendorBookings />} />
            <Route path='/vendor/services' element={<Services />} />
            <Route path='/vendor/messages' element={<VendorMessages />} />
            <Route path='/vendor/earnings' element={<VendorEarnings />} />
            <Route path='/vendor/profile' element={<VendorProfile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
