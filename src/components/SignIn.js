import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('https://express-passport-jwt-production.up.railway.app/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setUploadStatus('File uploaded successfully');
        console.log(data);
        setUploadedImageUrl(data.url); // Menyimpan URL gambar yang diunggah
      })
      .catch(error => {
        setUploadStatus('Error uploading file');
        console.error(error);
      });
  };


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [setJwtToken] = useState(""); // New state for JWT token
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://express-passport-jwt-production.up.railway.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
  
      if (data?.result?.success !== undefined) {
        const token = data.result.token;
        setJwtToken(token); // Save JWT token in the state
        alert("Berhasil. token JWT kamu: " + token);
        console.log(setJwtToken)
      } else if (data?.errors?.success === false) {
        alert("Terjadi kesalahan: " + data.errors.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  

  return (
    
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
      <h2>SignIn</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">SignIn</button>
      <Link to={"/signup"}>Sign-Up</Link>
    </form>
    {{}}

    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input type="file" onChange={handleFileInputChange} />
        </div>
        <div>
          <button type="submit">Upload</button>
        </div>
      </form>
      <p>{uploadStatus}</p>
      {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" />}
    </div>
    
    </div>
  );
};

export default SignIn;
