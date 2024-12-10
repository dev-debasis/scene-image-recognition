import React, { useState } from 'react';

const UploadForm = ({ onUpload }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) onUpload(image);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
