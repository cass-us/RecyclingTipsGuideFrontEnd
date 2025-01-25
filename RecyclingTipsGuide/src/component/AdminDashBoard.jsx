import React, { useState } from "react";
import WasteCategory from "./pages/WasteCategory.jsx";
import DisposalGuide from "./pages/DisposalLines.jsx";
import RecyclingTip from "./pages/RecyclingTip.jsx";

const AdminDashBoard = () => {
  const [wasteCategories, setWasteCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [disposalGuide, setDisposalGuide] = useState({ title: "", description: "", instructions: "" });
  const [recyclingTip, setRecyclingTip] = useState({ tipTitle: "", tipDescription: "", tipSource: "" });

  const handleAddCategory = async () => {};
  const handleDeleteCategory = async (id) => {};
  const handleAddDisposalGuide = async (categoryId) => {};
  const handleAddRecyclingTip = async (categoryId) => {};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <WasteCategory
        wasteCategories={wasteCategories}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        handleAddCategory={handleAddCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
      <DisposalGuide
        disposalGuide={disposalGuide}
        setDisposalGuide={setDisposalGuide}
        handleAddDisposalGuide={handleAddDisposalGuide}
      />
      <RecyclingTip
        recyclingTip={recyclingTip}
        setRecyclingTip={setRecyclingTip}
        handleAddRecyclingTip={handleAddRecyclingTip}
      />
    </div>
  );
};

export default AdminDashBoard;
