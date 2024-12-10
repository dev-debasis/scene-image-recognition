import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/api/upload', formData);
            onUploadSuccess(response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to upload the image.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h3 className="card-title text-center mb-4">Upload an Image</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadForm;