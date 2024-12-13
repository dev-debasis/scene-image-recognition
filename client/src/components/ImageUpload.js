
import React, { useState } from "react";

const ImageUpload = ({ onResult }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the image. Please try again.");
      }

      const data = await response.json();
      onResult(data); // Pass the result to the parent component
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-2">Upload Image for Text Recognition</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
      >
        {loading ? "Processing..." : "Upload and Detect Text"}
      </button>
    </div>
  );
};

export default ImageUpload;
