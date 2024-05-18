import React, { useState } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import FCImageInp from "../components/FCImageInp";

export default function FCSetImages() {
  // State to store selected images
  const [images, setImages] = useState({
    img1: null,
    img2: null,
    img3: null,
    img4: null,
    img5: null,
    img6: null,
  });

  const handleImgInput = (e) => {
    e.preventDefault();
    console.log(images);
    const formData = new FormData();
    for (const key in images) {
      if (images[key]) {
        console.log(`Key: ${key}, Value: ${images[key].name}`);
        formData.append(`files`, images[key]);
        console.log([...formData]);
      }
    }
    localStorage.setItem("current-email", JSON.stringify("@neta"));
    const currentEmail = JSON.stringify(localStorage.getItem("current-email"));
    makeAmoveUserServer
      .changeImages({ currentEmail, formData })
      .then((response) => {
        console.log(formData.getAll(`files`));
        if (response) {
          console.log("success");
          console.log(response);
          navigate("/");
        } else {
          console.log("failure");
        }
      });
  };

  const handleImageChange = (name, file) => {
    setImages((prevImages) => ({
      ...prevImages,
      [name]: file,
    }));
  };

  return (
    <>
      <h1>תמונות</h1>
      <form onSubmit={handleImgInput}>
        <div className="images-inp-container">
          <FCImageInp name={"img1"} onChange={handleImageChange} />
          <FCImageInp name={"img2"} onChange={handleImageChange} />
          <FCImageInp name={"img3"} onChange={handleImageChange} />
          <FCImageInp name={"img4"} onChange={handleImageChange} />
          <FCImageInp name={"img5"} onChange={handleImageChange} />
          <FCImageInp name={"img6"} onChange={handleImageChange} />
        </div>
        <FCCustomBtn title="סיום" type={"submit"} />
      </form>
    </>
  );
}
