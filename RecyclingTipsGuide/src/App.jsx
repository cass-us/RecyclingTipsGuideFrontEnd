import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HeroSection from "./component/HeroSection.jsx";
import MainSection from "./component/MainSection.jsx";
import FooterSection from "./component/FooterSection.jsx";
import AdminDashBoard from "./component/AdminDashBoard.jsx"; 
import WasteCategory from "./component/pages/WasteCategory.jsx";
import DisposalLines from "./component/pages/DisposalLines.jsx";
import RecyclingTip from "./component/pages/RecyclingTip.jsx";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn && (
          <Route
            path="/"
            element={
              <>
                {/* <HeroSection handleLogin={handleLogin} />
                <MainSection />
                <FooterSection /> */}
                 {/* {*<MainSection />
               <AdminDashBoard />*} */}
               {/* <WasteCategory/> */}
               <DisposalLines/>
               <RecyclingTip/>
              </>
            }
          />
        )}

        
        {isLoggedIn && (
          <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        )}

      
        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/admin-dashboard" /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
