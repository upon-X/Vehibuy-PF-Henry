import style from "./UserImage.module.css";
import React, { useState } from "react";
import axios from "axios";
import { uploadImageFail, uploadImageSuccess } from "../../NotiStack";

const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/Vehibuy/upload";

const UserImage = () => {
  const loggedUserJson = localStorage.getItem("authToken");
  const loggedUser = loggedUserJson ? JSON.parse(loggedUserJson) : null;
  const userId = loggedUser.response.id;
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

  const handleImageUpload = async (selectedFile) => {
    if (!selectedFile) {
      setError("please select an image");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("The selected file is not a valid image");
      return;
    }

    return selectedFile;
  };

  const handleButton = async (event) => {
    event.preventDefault();

    const inputElement = document.getElementById("imageInput");
    const file = await handleImageUpload(inputElement.files[0]);
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jsnxe58v");
    formData.append("folder", `user_Profileimg_${userId}`);

    try {
      const response = await axios.post(cloudinaryUploadUrl, formData);
      if (response.status === 200) {
        setImageUrl(response.data.secure_url);
        uploadImageSuccess()
        setError("Image uploaded successfully");
        localStorage.setItem("userImage", response.data.secure_url);
        const { data } = await axios.put(`/user/${userId}`, { image: response.data.secure_url });
      }
    } catch (error) {
      uploadImageFail()
      setError("Error uploading image to Cloudinary");
    }
  };

  return (
    <div>
      <label htmlFor="imageInput" className={style.buttonImage}>
        Select File
      </label>
      <input
        type="file"
        accept="image/*"
        id="imageInput"
        className={style.hiddenInput}
        title="No files selected" // Texto en inglés
      />
      <button onClick={handleButton} className={style.buttonImage}>
        Upload
      </button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default UserImage;