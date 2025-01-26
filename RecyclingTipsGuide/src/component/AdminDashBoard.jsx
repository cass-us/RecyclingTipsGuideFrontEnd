import React, { useState } from "react";

const AdminDashBoard = () => {
  const [wasteCategories, setWasteCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ type: "", description: "" });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showDisposalForm, setShowDisposalForm] = useState(false);
  const [showRecyclingForm, setShowRecyclingForm] = useState(false);
  const [disposalGuide, setDisposalGuide] = useState({ title: "", description: "", instructions: "" });
  const [recyclingTip, setRecyclingTip] = useState({ tipTitle: "", tipDescription: "", tipSource: "" });

  const handleAddCategory = () => {
    if (newCategory.type && newCategory.description) {
      setWasteCategories([...wasteCategories, { ...newCategory, id: Date.now() }]);
      setNewCategory({ type: "", description: "" });
    }
  };

  const handleAddDisposalGuide = () => {
    if (selectedCategory && disposalGuide.title && disposalGuide.description && disposalGuide.instructions) {
      console.log("Disposal guide added for:", selectedCategory.type);
      setShowDisposalForm(false);
      setDisposalGuide({ title: "", description: "", instructions: "" });
    }
  };

  const handleAddRecyclingTip = () => {
    if (selectedCategory && recyclingTip.tipTitle && recyclingTip.tipDescription && recyclingTip.tipSource) {
      console.log("Recycling tip added for:", selectedCategory.type);
      setShowRecyclingForm(false);
      setRecyclingTip({ tipTitle: "", tipDescription: "", tipSource: "" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Waste Category Section */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add Waste Category</h2>
        <div className="flex gap-4 items-center">
          <select
            value={newCategory.type}
            onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
            className="border rounded p-2 flex-1"
          >
            <option value="" disabled>
              Select Category Type
            </option>
            <option value="Plastic">Plastic</option>
            <option value="Metal">Metal</option>
            <option value="Paper">Paper</option>
            <option value="Glass">Glass</option>
            <option value="Organic">Organic</option>
          </select>
          <input
            type="text"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Category
          </button>
        </div>

        {/* List of Categories */}
        <ul className="mt-4">
          {wasteCategories.map((category) => (
            <li
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer p-2 border rounded mb-2 ${
                selectedCategory?.id === category.id ? "bg-blue-100" : ""
              }`}
            >
              {category.type} - {category.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Options Section */}
      {selectedCategory && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Manage {selectedCategory.type}</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setShowDisposalForm(!showDisposalForm)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Disposal Guidelines
            </button>
            <button
              onClick={() => setShowRecyclingForm(!showRecyclingForm)}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Add Recycling Tips
            </button>
          </div>

          {/* Disposal Form */}
          {showDisposalForm && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Disposal Guidelines</h3>
              <input
                type="text"
                placeholder="Title"
                value={disposalGuide.title}
                onChange={(e) => setDisposalGuide({ ...disposalGuide, title: e.target.value })}
                className="border rounded p-2 w-full mb-2"
              />
              <textarea
                placeholder="Description"
                value={disposalGuide.description}
                onChange={(e) => setDisposalGuide({ ...disposalGuide, description: e.target.value })}
                className="border rounded p-2 w-full mb-2"
              />
              <textarea
                placeholder="Instructions"
                value={disposalGuide.instructions}
                onChange={(e) => setDisposalGuide({ ...disposalGuide, instructions: e.target.value })}
                className="border rounded p-2 w-full mb-2"
              />
              <button
                onClick={handleAddDisposalGuide}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Disposal Guide
              </button>
            </div>
          )}

          {/* Recycling Tips Form */}
          {showRecyclingForm && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Recycling Tips</h3>
              <input
                type="text"
                placeholder="Tip Title"
                value={recyclingTip.tipTitle}
                onChange={(e) => setRecyclingTip({ ...recyclingTip, tipTitle: e.target.value })}
                className="border rounded p-2 w-full mb-2"
              />
              <textarea
                placeholder="Tip Description"
                value={recyclingTip.tipDescription}
                onChange={(e) => setRecyclingTip({ ...recyclingTip, tipDescription: e.target.value })}
                className="border rounded p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Source"
                value={recyclingTip.tipSource}
                onChange={(e) => setRecyclingTip({ ...recyclingTip, tipSource: e.target.value })}
                className="border rounded p-2 w-full mb-2"
              />
              <button
                onClick={handleAddRecyclingTip}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
              >
                Save Recycling Tip
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashBoard;
