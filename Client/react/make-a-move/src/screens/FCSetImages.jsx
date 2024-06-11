import React, { useState, useEffect } from "react";
import FCCustomBtn from "../components/FCCustomBtn";
import { makeAmoveUserServer } from "../services";
import { useNavigate } from "react-router-dom";
import FCImageInp from "../components/FCImageInp";
import FCUpload from "../components/FCUpload";
import FCGetImage from "../components/FCGetImage";

export default function FCSetImages() {
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // Assuming you might need this for navigation

  useEffect(() => {
    const currentEmail = JSON.parse(localStorage.getItem("current-email"));
    if (currentEmail) {
      makeAmoveUserServer
        .GetUserByEmail(currentEmail)
        .then((userData) => {
          setUser(userData); // Set user state with retrieved data
        })
        .catch((error) => {
          console.error("Error:", error);
          // Handle error
        });
    }
  }, []);

  const handleImgInput = (e) => {
    e.preventDefault();
    navigate("/preferences");
  };

  return (
    <>
      <h1>תמונות</h1>
      <form onSubmit={handleImgInput}>
        <div className="images-inp-container">
          <FCUpload obj={user} />
          <div className="image-view">
            {/* Render existing images */}
            {user.image && user.image.length > 0 ? (
              user.image.map((img) => (
                <FCGetImage
                  key={img}
                  image={img}
                  user={user}
                  imageIndex={user.image.indexOf(img)}
                />
              ))
            ) : (
              <p>אין תמונות להציג</p>
            )}
          </div>
        </div>
        <FCCustomBtn title="סיום" type="submit" />
      </form>
    </>
  );
}
