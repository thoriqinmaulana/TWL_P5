import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVnb2FickB1c2VyLmNvbSIsImlkIjoiNjQ1Y2VkYjhmYTM5ZmE2ODg0NjA2YjI2IiwiaWF0IjoxNjgzODExODEzLCJleHAiOjE2ODM4OTgyMTN9.oMWkofo44bh2O5zH2B4lzp-YHzupzAmNbVLDQWXLEKk";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get("https://express-passport-jwt-production.up.railway.app/images",{headers})
      .then((response) => {
        console.log("res:", response);
        setImages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      {images.map((image) => (
        <div key={image.id}>
          <h2>{image.filename}</h2>
          <img src={image.url} alt={image.filename} />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
