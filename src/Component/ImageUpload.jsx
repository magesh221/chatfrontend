import React, { useState, useEffect } from "react";
import axios from "axios";
import Url from "./RouteUrl";
import blankImage from "../image/black.png";

export const ImageUploadComponent = () => {
  const [file, setFile] = useState(null);
  const [dataUrl, setDataUrl] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [profile, setProfile] = useState({});

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    try {
      axios
        .get(Url.profile_pic, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const res = response?.data?.response;
          const filePath = res.filePath;
          const data = {
            name: res.name,
            email: res.email,
            phone: res.phone,
          };
          setProfile(data);

          if (filePath == null) {
            setUploadedImage(blankImage);
          } else {
            setUploadedImage(filePath);
          }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    } catch (error) {
      console.log("error: ", error);
    }
  }, [token]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setDataUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filePath", dataUrl);

      const response = await axios.post(Url.imageupload, formData, {
        headers: {
          "Content-Type": false,
          "Process-Data": false,
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("File uploaded successfully");
      setUploadedImage(dataUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image");
    }
  };

  return (
    <div className="img_uplde">
      <div className="img_flex">
        <input className="input-box" type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Image Upload</button>
        {message && <p>{message}</p>}
      </div>
      <div>
        <div>
          <h2 className="name">{profile.name}</h2 >
          <p className="email">{profile.email}</p>
          <p className="phone">{profile.phone}</p>
        </div>
      </div>
      {uploadedImage && (
        <div className="uploaded-image-container">
          <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />
        </div>
      )}
      <div className="profile_pic">
        <h2>Profile Picture</h2>
      </div>  
    </div>
  );
};
