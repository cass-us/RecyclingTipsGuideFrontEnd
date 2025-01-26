import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Only import once
import HeroSection from "./component/HeroSection.jsx";
import MainSection from "./component/MainSection.jsx";
import FooterSection from "./component/FooterSection.jsx";
import AdminDashBoard from "./component/AdminDashBoard.jsx";

function App() {
  
  return (
    <Router> 
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>
            <MainSection/>
            <FooterSection/>
          </>
        } />
        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
