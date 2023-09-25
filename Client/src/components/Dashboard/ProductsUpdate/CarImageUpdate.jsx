import React, { useState } from "react";
import axios from "axios";

const CarImage = () => {

  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const cloudinaryUploadUrl =  "https://api.cloudinary.com/v1_1/Vehibuy/upload";

    console.log(imageUrl)

  const handleImageUpload = async (selectedFile) => {
    setError(null);

    if (!selectedFile) {
      setError("Please, select an image.");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("The selected file is not a valid image.");
      return;
    }

    return selectedFile;
  };

  const handleButton = async (event) => {
    event.preventDefault();

    const inputElement = document.getElementById("imageInput");
    const file = await handleImageUpload(inputElement.files);
    if (!file) {
      return;
    }


    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jsnxe58v");
    formData.append("folder", `user_Profileimg${userId}_car`);

    try {
        
        const response = await axios.post(cloudinaryUploadUrl, formData);
        
      if(response.status === 200) {
          setImageUrl(response.data.secure_url);
          setError('Image uploaded successfully')
      }
    } catch (error) {
      setError("Error uploading image to Cloudinary");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" id="imageInput" />
      <button onClick={handleButton}>Upload</button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default CarImage;
