import React, { useState, useEffect } from "react";

const WasteCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/waste-category/getAllCategories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Error fetching categories.");
      }
    };

    fetchCategories();
  }, []);


  const handleAddCategory = async () => {
    if (!newCategory.name.trim() || !newCategory.description.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8082/api/waste-category/addCategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });

      if (response.ok) {
        const addedCategory = await response.json();
        setCategories([...categories, addedCategory]);
        setNewCategory({ name: "", description: "" });
        alert("Category added successfully!");
      } else {
        alert("Failed to add category.");
      }
    } catch (err) {
      console.error("Error adding category:", err);
      setError("Error adding category.");
    } finally {
      setLoading(false);
    }
  };

 
  const handleDeleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/api/waste-category/deleteCategory/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
        alert("Category deleted successfully!");
      } else {
        alert("Failed to delete category.");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      setError("Error deleting category.");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Waste Categories</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <select
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        className="border px-3 py-2 w-full mb-2"
      >
        <option value="">Select Category</option>
        <option value="Plastic">Plastic</option>
        <option value="Glass">Glass</option>
        <option value="Metal">Metal</option>
        <option value="Paper">Paper</option>
        <option value="Electronic">Electronic</option>
      </select>
      <input
        type="text"
        placeholder="Description"
        value={newCategory.description}
        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
        className="border px-3 py-2 w-full mb-2"
      />
      <button
        onClick={handleAddCategory}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Category"}
      </button>

      <ul className="list-disc pl-5 mt-4">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center mb-2">
            <div>
              <strong>{category.name}</strong>: {category.description}
            </div>
            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WasteCategory;
