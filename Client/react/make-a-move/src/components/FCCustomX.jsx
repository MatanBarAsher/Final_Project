import React from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function FCCustomX(color) {
  return (
    <button
      className="x-btn"
      style={{
        background: "none",
        color: "white",
        height: 30,
        width: 30,
        position: "absolute",
        top: 15,
        right: 15,
      }}
    >
      <CloseIcon />
    </button>
  );
}
