import React from "react";
import FCCustomX from "../components/FCCustomX";
import { Navigate, useNavigate } from "react-router";
import background from "../assets/images/Matan.jpg";

export default function FCMatchList() {
  const Navigate = useNavigate();

  const temp = {
    name: "Yael",
    matchID: 2,
  };

  const handleMatchClick = () => {
    localStorage.setItem("matched-user", JSON.stringify(temp));
    Navigate("/feedback");
  };

  return (
    <div onClick={handleMatchClick} className="match-list">
      <FCCustomX color="white" />
      <h1>התאמות</h1>
      <div className="match">
        <div
          className="profile-image"
          style={{
            backgroundImage: `url(.${background})`,
            height: 60,
            width: 60,
            marginRight: 210,
            border: "4px solid white",
            borderRadius: "50%",
            float: "left",
          }}
        ></div>
      </div>
    </div>
  );
}
