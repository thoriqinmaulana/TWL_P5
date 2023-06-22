import React, { useState } from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();
    formData.append('image', selectedFile);

    // Add the token to the request header
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVnb2FickB1c2VyLmNvbSIsImlkIjoiNjQ1Y2VkYjhmYTM5ZmE2ODg0NjA2YjI2IiwiaWF0IjoxNjgzODExODEzLCJleHAiOjE2ODM4OTgyMTN9.oMWkofo44bh2O5zH2B4lzp-YHzupzAmNbVLDQWXLEKk';
    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    };

    try {
      // Make the API request using axios
      const response = await axios.post(
        'https://express-passport-jwt-production.up.railway.app/upload',
        formData,
        { headers }
      );

      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      <ImageGallery/>
    </form>
  );
};

export default FileUpload;
