import React, { useState, useEffect } from "react";
import axios from "axios";

function DisplayImage({ imageId }) {
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
        setError("Error fetching image: " + error.message);
      }
    };

    fetchImage();
  }, [imageId]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Display Image</h3>
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
