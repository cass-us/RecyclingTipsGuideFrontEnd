import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import logo from "./assets/recyclingLogo.png";
import re1 from "./assets/re1.jpg";
import re2 from "./assets/r2.jpg";
import re3 from "./assets/r3.jpg";

const HeroSection = () => {
  const navigate = useNavigate(); 
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [adminNumber, setAdminNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 

  
  const slides = [
    {
      type: "image",
      src: re1,
      alt: "Image 1",
      text: "Welcome to RecyclingGuide",
    },
    {
      type: "image",
      src: re2,
      alt: "Image 2",
      text: "Recycle and Save the Planet",
    },
    {
      type: "image",
      src: re3,
      alt: "Image 3",
      text: "Join the Green Movement",
    },
  ];

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000); 

  
    return () => clearInterval(interval);
  }, [slides.length]);

  
  const handleLogin = () => {
    if (!adminNumber || !password) {
      setErrorMessage("Please fill in both fields");
      return;
    }

    axios
      .post("http://localhost:8082/admin/login", null, {
        params: {
          adminNumber: adminNumber,
          password: password,
        },
      })
      .then((response) => {
        console.log(response.data); 
        alert("Login successful");
        setIsModalOpen(false); 

       
        navigate("/admin-dashboard"); 
      })
      .catch((error) => {
        console.error("Login failed", error);
        setErrorMessage("Invalid credentials");
      });
  };

  return (
    <section className="bg-gray-50 py h-[600px]">
    
      <nav className="bg-green-300 w-full flex items-center justify-between px-6 py-4 opacity-80">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Recycling Guide Logo" className="h-12" />
          <h1 className="text-2xl font-bold text-white">RecyclingGuide</h1>
        </div>

       
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsModalOpen(true)} 
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600  transform transition-all hover:scale-105"
            style={{
              background: "linear-gradient(45deg, #76c893, #4caf50)",
              border: "2px solid #3e8e41",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Admin Login
          </button>
        </div>
      </nav>

      
      <div className="h-3/4 w-full flex justify-center items-center bg-white relative">
        {slides[currentSlide].type === "image" && (
          <div className="relative w-full h-full">
            <img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
              {slides[currentSlide].text}
            </div>
          </div>
        )}
      </div>

     
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>

           
            <div className="flex flex-col mb-4">
              <input
                type="text"
                placeholder="Admin Number"
                value={adminNumber}
                onChange={(e) => setAdminNumber(e.target.value)}
                className="border p-2 mb-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 mb-2"
              />
            </div>

            
            {errorMessage && (
              <div className="text-red-500 text-center mt-4">{errorMessage}</div>
            )}
            
            <div className="flex justify-between items-center">
              <button
                onClick={handleLogin} 
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transform transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(45deg, #76c893, #4caf50)",
                  border: "2px solid #3e8e41",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                Login
              </button>
              <button
                onClick={() => setIsModalOpen(false)} 
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transform transition-all hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
