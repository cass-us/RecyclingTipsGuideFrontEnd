import React, { useState, useEffect } from "react";

const RecyclingTip = () => {
  const [recyclingTips, setRecyclingTips] = useState([]);
  const [newTip, setNewTip] = useState({
    tipTitle: "",
    tipDescription: "",
    tipSource: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchRecyclingTips = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/recycling-tips/getAllTips");
        const data = await response.json();
        setRecyclingTips(data);
      } catch (err) {
        console.error("Error fetching recycling tips:", err);
        setError("Failed to fetch recycling tips.");
      }
    };

    fetchRecyclingTips();
  }, []);

  
  const handleAddRecyclingTip = async () => {
    if (!newTip.tipTitle.trim() || !newTip.tipDescription.trim() || !newTip.tipSource.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8082/api/recycling-tips/addTip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTip),
      });

      if (response.ok) {
        const addedTip = await response.json();
        setRecyclingTips([...recyclingTips, addedTip]);
        setNewTip({ tipTitle: "", tipDescription: "", tipSource: "" });
        alert("Recycling tip added successfully!");
      } else {
        alert("Failed to add recycling tip.");
      }
    } catch (err) {
      console.error("Error adding recycling tip:", err);
      setError("Error adding recycling tip.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleDeleteTip = async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/api/recycling-tips/deleteTip/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRecyclingTips(recyclingTips.filter((tip) => tip.id !== id));
        alert("Recycling tip deleted successfully!");
      } else {
        alert("Failed to delete recycling tip.");
      }
    } catch (err) {
      console.error("Error deleting recycling tip:", err);
      setError("Error deleting recycling tip.");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Recycling Tips</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Tip Title"
        value={newTip.tipTitle}
        onChange={(e) => setNewTip({ ...newTip, tipTitle: e.target.value })}
        className="border px-3 py-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Tip Description"
        value={newTip.tipDescription}
        onChange={(e) => setNewTip({ ...newTip, tipDescription: e.target.value })}
        className="border px-3 py-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Tip Source"
        value={newTip.tipSource}
        onChange={(e) => setNewTip({ ...newTip, tipSource: e.target.value })}
        className="border px-3 py-2 w-full mb-2"
      />
      <button
        onClick={handleAddRecyclingTip}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mb-4"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Tip"}
      </button>

      <ul className="list-disc pl-5 mt-4">
        {recyclingTips.map((tip) => (
          <li key={tip.id} className="flex justify-between items-center mb-2">
            <div>
              <strong>{tip.tipTitle}</strong>: {tip.tipDescription} (Source: {tip.tipSource})
            </div>
            <button
              onClick={() => handleDeleteTip(tip.id)}
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

export default RecyclingTip;
