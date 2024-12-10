import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [detectedText, setDetectedText] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle image upload and processing
  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update state with the detected text returned by the backend
      setDetectedText(response.data.result);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload Image for Text Recognition</h2>
      
      {/* File input for image upload */}
      <input type="file" onChange={handleFileChange} />
      
      {/* Upload button */}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Processing...' : 'Upload and Detect Text'}
      </button>

      {/* Display detected text */}
      {detectedText && (
        <div>
          <h3>Detected Text:</h3>
          <p>{detectedText}</p>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
