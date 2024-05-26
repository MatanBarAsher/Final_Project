import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeAmoveUserServer } from "../services";

function UploadImage({ obj }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIcon("✔️");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("קודם צריך לבחור תמונה");
      return;
    }
    if (obj.image.length >= 4) {
      setMessage("ניתן להוסיף עד 4 תמונות.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL}/users/AddImages`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      console.log(obj);
      if (response.data > 0) {
        setMessage(response.data);
        obj.image.push(String(response.data));
        console.log(obj);
        makeAmoveUserServer
          .updateUser(obj)
          .then((res) => {
            console.log(res.data + "image added successfuly.");
            location.reload();
          })
          .catch((res) => console.log(res));
      }
    } catch (error) {
      setMessage("Error uploading image: " + error.message);
    }
  };

  return (
    <div>
      <label className="custom-file-label">
        + הוסף תמונה<span> {icon}</span>
      </label>

      <input type="file" className="input-file" onChange={handleFileChange} />
      <button className="custom-file-upload" onClick={handleUpload}>
        העלאה
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UploadImage;
