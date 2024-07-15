import React, { useState } from "react";
import FCProfileView from "./FCProfileView";
import FCBackArrow from "../components/FCBackArrow";
import FCNextArrow from "../components/FCNextArrow";

export default function FCCarousel(users) {
  const [index, setIndex] = useState(0);
  const usersList = users.users;

  const nextProfile = () => {
    if (index < usersList.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  };
  const prevProfile = () => {
    if (index === 0) {
      setIndex(usersList.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div
      style={{
        border: "1px solid white",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "30px",
          position: "fixed",
          top: 120,
          right: -11,
          backgroundColor: "#efe1d1",
          color: "white",
          opacity: 0.8,
          borderRadius: 20,
          boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.7)",
        }}
        onClick={nextProfile}
      >
        <FCNextArrow color="white" />
      </div>
      <div
        style={{
          width: "50px",
          height: "30px",
          position: "fixed",
          top: 120,
          left: -11,
          backgroundColor: "#efe1d1",
          color: "white",
          opacity: 0.8,
          borderRadius: 20,
          boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.7)",
        }}
        onClick={prevProfile}
      >
        <FCBackArrow color="white" style={{ opacity: 1, color: "white" }} />
      </div>
      <FCProfileView userToShow={usersList[index]} />
    </div>
  );
}
