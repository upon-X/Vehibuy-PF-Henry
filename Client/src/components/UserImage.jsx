import React, { useState } from "react";
import axios from "axios";

const userId = 15;
const cloudinaryUploadUrl =  "https://api.cloudinary.com/v1_1/Vehibuy/upload";

const UserImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);

    console.log(imageUrl)

  const handleImageUpload = async (selectedFile) => {
    setError(null);

    if (!selectedFile) {
      setError("Por favor, seleccione una imagen.");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("El archivo seleccionado no es una imagen válida.");
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

    const imgUrl ='https://res.cloudinary.com/vehibuy/image/upload/v1693774214/user_Profileimg15/ar020-004st-1574113832_mv4yrc.jpg'
    if (imgUrl) {
        try {
            const response = await axios.delete(imgUrl)
        } catch (error) {
            serError('Error al eliminar la imagen anterior')
        }
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "jsnxe58v");
    formData.append("folder", `user_Profileimg${userId}`);

    try {
        
        const response = await axios.post(cloudinaryUploadUrl, formData);
        
      if(response.status === 200) {
          setImageUrl(response.data.secure_url);
          setError('Imagen subida con existo')
      }
    } catch (error) {
      setError("Error al subir la imagen a Cloudinary");
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

export default UserImage;
