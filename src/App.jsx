import React from "react";
// import HomePage from "./pages/clients/HomePage";
import Landing from "./pages/Landing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
const App = () => {
  return (
    <div>
      {/* <BrowserRouter></BrowserRouter> */}
      <Router>
        <Routes>
          {/* <Route path='/' element={<HomePage />} /> */}
          <Route path='/' element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
