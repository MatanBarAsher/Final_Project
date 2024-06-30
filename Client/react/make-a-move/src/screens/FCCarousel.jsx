import React, { useState } from "react";
import FCProfileView from "./FCProfileView";

export default function FCCarousel(users) {
  const [index, setIndex] = useState(0);
  const usersList = users.users;
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
          right: 0,
          backgroundColor: "green",
        }}
      >
        הבא
      </div>
      <div
        style={{
          width: "50px",
          height: "30px",
          position: "fixed",
          top: 120,
          left: 0,
          backgroundColor: "green",
        }}
      >
        הקודם
      </div>
      <FCProfileView userToShow={usersList[index]} />
    </div>
  );
}
