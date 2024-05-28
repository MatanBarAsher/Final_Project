import React, { useState, useEffect } from "react";
import axios from "axios";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { makeAmoveUserServer } from "../services";

function DisplayImage({ imageId, user }) {
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_MAKE_A_MOVE_SERVER_URL
          }/users/GetImage?imageId=${imageId}`,
          {
            responseType: "blob",
          }
        );

        const imageUrl = URL.createObjectURL(response.data);
        setImageSrc(imageUrl);
      } catch (error) {
        console.log("Error fetching image: " + error.message);
        setError("Error fetching image: " + error.message);
      }
    };

    fetchImage();
  }, [imageId]);

  if (error) {
    return <p>{error}</p>;
  }

  const deleteImage = (e, imageId) => {
    e.preventDefault();
    console.log(imageId);
    console.log(user.image);
    const newImages = user.image.filter((img) => img !== imageId);
    user.image = newImages;
    makeAmoveUserServer
      .updateUser(user)
      .then((res) => {
        console.log(res.data + " image removed.");
        location.reload();
      })
      .catch((res) => console.log(res + " error removing image."));
  };

  return (
    <div>
      <h3>
        <button
          className="delete-btn"
          id={imageId}
          onClick={(e) => deleteImage(e, imageId)}
        >
          <RemoveCircleOutlineRoundedIcon
            style={{ fontSize: "18px", color: "#3C0753" }}
          />
        </button>
      </h3>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="User Image"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DisplayImage;
