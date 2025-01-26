import React, { useState, useEffect } from 'react';
import rec from "./assets/Recycling-codes-infographic.webp";

const MainSection = () => {
  const [categories, setCategories] = useState([]);
  const [disposalGuide, setDisposalGuide] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('disposal');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 5; 
  const slidesInterval = 3000; 

  useEffect(() => {
    fetch('http://localhost:8082/api/waste-category/getAllCategories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8082/api/disposal-guidelines/getAllGuides')
      .then((response) => response.json())
      .then((data) => setDisposalGuide(data))
      .catch((error) => console.error('Error fetching Disposal Guide:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === disposalGuide.length - 1 ? 0 : prevSlide + 1
      );
    }, slidesInterval);

    return () => clearInterval(interval); 
  }, [disposalGuide.length]);

  const toggleCategory = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setActiveTab('disposal');
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(disposalGuide.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-green-600 mb-6">Waste Categories</h2>
        <p className="text-xl text-gray-700 mb-8">
          Choose a waste category to explore detailed disposal guides and recycling tips.
        </p>
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h3
              onClick={() => toggleCategory(category.name)}
              className="text-2xl font-semibold text-green-600 mb-4 cursor-pointer"
            >
              {category.name}
            </h3>
            {selectedCategory === category.name && (
              <div>
                <p className="text-gray-700 mb-4">{category.description}</p>
                <div className="flex justify-center space-x-4 mb-4">
                  <button
                    onClick={() => setActiveTab('disposal')}
                    className={`py-2 px-4 rounded-lg ${activeTab === 'disposal' ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
                  >
                    Disposal Guide
                  </button>
                  <button
                    onClick={() => setActiveTab('recycling')}
                    className={`py-2 px-4 rounded-lg ${activeTab === 'recycling' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                  >
                    Recycling Tips
                  </button>
                </div>

                <div className="mt-4">
                  {activeTab === 'disposal' && (
                    <div className="text-gray-700">
                      <div className="relative">
                        <div className="absolute inset-0 flex justify-center items-center">
                          <p>{disposalGuide[currentSlide]?.instructions || 'No disposal guide available'}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'recycling' && (
                    <div className="text-gray-700">
                      <p>{category.recyclingTips}</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevPage}
                    className="py-2 px-4 bg-gray-300 text-black rounded-lg"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    className="py-2 px-4 bg-gray-300 text-black rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSection;
