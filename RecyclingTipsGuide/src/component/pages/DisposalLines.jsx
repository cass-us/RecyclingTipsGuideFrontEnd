import React, { useState, useEffect } from "react";

const DisposalLines = () => {
  const [disposalGuides, setDisposalGuides] = useState([]);
  const [newGuide, setNewGuide] = useState({ title: "", description: "", instructions: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all disposal guides on mount
  useEffect(() => {
    const fetchDisposalGuides = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/disposal-guidelines/getAllGuides");
        const data = await response.json();
        setDisposalGuides(data);
      } catch (err) {
        console.error("Error fetching disposal guides:", err);
        setError("Failed to fetch disposal guides.");
      }
    };

    fetchDisposalGuides();
  }, []);

  // Add a new disposal guide
  const handleAddDisposalGuide = async () => {
    if (!newGuide.title.trim() || !newGuide.description.trim() || !newGuide.instructions.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8082/api/disposal-guidelines/addGuide?categoryId=1`, // Replace `1` with the actual categoryId if dynamic
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newGuide),
        }
      );

      if (response.ok) {
        const addedGuide = await response.json();
        setDisposalGuides([...disposalGuides, addedGuide]);
        setNewGuide({ title: "", description: "", instructions: "" });
        alert("Disposal guide added successfully!");
      } else {
        alert("Failed to add disposal guide.");
      }
    } catch (err) {
      console.error("Error adding disposal guide:", err);
      setError("Error adding disposal guide.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a disposal guide
  const handleDeleteGuide = async (id) => {
    try {
      const response = await fetch(`http://localhost:8082/api/disposal-guidelines/deleteGuide/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDisposalGuides(disposalGuides.filter((guide) => guide.id !== id));
        alert("Disposal guide deleted successfully!");
      } else {
        alert("Failed to delete disposal guide.");
      }
    } catch (err) {
      console.error("Error deleting disposal guide:", err);
      setError("Error deleting disposal guide.");
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Disposal Guide</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <input
        type="text"
        placeholder="Title"
        value={newGuide.title}
        onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
        className="border px-3 py-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={newGuide.description}
        onChange={(e) => setNewGuide({ ...newGuide, description: e.target.value })}
        className="border px-3 py-2 w-full mb-2"
      />
      <textarea
        placeholder="Instructions"
        value={newGuide.instructions}
        onChange={(e) => setNewGuide({ ...newGuide, instructions: e.target.value })}
        className="border px-3 py-2 w-full mb-2"
      />
      <button
        onClick={handleAddDisposalGuide}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Guide"}
      </button>

      <ul className="list-disc pl-5 mt-4">
        {disposalGuides.map((guide) => (
          <li key={guide.id} className="flex justify-between items-center mb-2">
            <div>
              <strong>{guide.title}</strong>: {guide.description} - {guide.instructions}
            </div>
            <button
              onClick={() => handleDeleteGuide(guide.id)}
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

export default DisposalLines;
