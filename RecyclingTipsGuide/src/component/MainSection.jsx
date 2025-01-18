import React, { useState, useEffect } from 'react';

const MainSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('disposal');

  useEffect(() => {
    // Fetch categories from the API
    fetch('http://localhost:8082/api/waste-category/getAllCategories')
      .then((response) => response.json())
      .then((data) => setCategories(data)) // Set categories to the response data
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setActiveTab('disposal'); // Default to 'disposal' tab when opening a category
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
                <div className="flex justify-center space-x-0">
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
                  {activeTab === 'disposal' && <p className="text-gray-700">{category.disposalGuide}</p>}
                  {activeTab === 'recycling' && <p className="text-gray-700">{category.recyclingTips}</p>}
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
