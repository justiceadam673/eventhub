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
// import VendorDashboard from "./pages/vendors/Dashboard";
// import Services from "./pages/vendors/Services";
import Layout from "./pages/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />

          {/* Client Routes with Layout */}
          <Route element={<Layout />}>
            <Route path='/dashboard' element={<ClientDashboard />} />
            <Route path='/vendors' element={<Vendors />} />
            <Route path='/bookings' element={<Booking />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          {/* Vendor Routes with Layout */}
          <Route element={<Layout />}>
            {/* <Route path='/vendor/dashboard' element={<VendorDashboard />} /> */}
            {/* <Route path='/vendor/services' element={<Services />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
